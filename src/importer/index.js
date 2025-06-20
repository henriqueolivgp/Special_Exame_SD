// Import necessary modules
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const dbConfig = {
    host: 'bl-db',
    port: 5432,
    user: 'sd',
    database: 'sd',
    password: 'sd',
};

// HelloWorld module
const HelloWorld = {
    say: function () {
        console.log("Hello, World!!");
    }
};

// JSONObserver module
const JSONObserver = {
    list: function () {
        console.log("Listing all available JSON files!");
        try {
            const files = fs.readdirSync("/data");
            files.filter(file => file.endsWith(".json")).forEach(this.processFile);
        } catch (error) {
            console.log(`Error accessing /data: ${error}`);
        }
    },

    processFile: function (fileName) {
        console.log(`Processing file: ${fileName}`);
        const filePath = path.join("/data", fileName);
        const content = fs.readFileSync(filePath, 'utf8');
        JSONObserver.parse(content);
    },

    // Read the .json file and save the data into a variable
    parse: function (content) {
        console.log(`JSON Content of the file: \n${content}`);
        try {
            const movies = JSON.parse(content).map(movie => ({
                title: movie.title,
                year: movie.year,
                cast: movie.cast,
                genres: movie.genres,
                href: movie.href,
                extract: movie.extract,
                thumbnail: movie.thumbnail,
                thumbnail_width: parseInt(movie.thumbnail_width) || null, // Convert to integer
                thumbnail_height: parseInt(movie.thumbnail_height) || null // Convert to integer
            }));

            console.log(movies);
            // Call the insert function once the data is stored in the variable
            // This will insert all movies in the movies variable into the db
            await = this.insertToDatabase(movies);

        } catch (err) {
            console.error(`Error parsing JSON: ${err}`);
            return;
        }
    },

    // Insert movies into the database
    insertToDatabase: async function (movies) {
        const client = new Client(dbConfig);
        console.log('os filmes foram recebidos' + JSON.stringify(movies))

        try {
            await client.connect();
            console.log('Connected to the database.');
            const deleteData = `
            DELETE FROM "Movies"; 
            DELETE FROM "Genres";
            DELETE FROM "Casts";
        `;
            try {
                await client.query(deleteData);
                console.log(`All data deleted in Movies, Casts and Genres`);
            } catch (err) {
                console.error(`Error delete=ing data: ${err}`);
            }

            for (const movie of movies) {

                let castId = await this.getOrInsertCastId(client, movie.cast);
                let genresId = await this.getOrInsertGenresId(client, movie.genres);

                const query = `
                    INSERT INTO "Movies" 
                    (title, year, href, extract, thumbnail, thumbnail_width, thumbnail_height, cast_id, genres_id) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                `;

                const values = [
                    movie.title, movie.year, movie.href, movie.extract, movie.thumbnail,
                    movie.thumbnail_width, movie.thumbnail_height, castId, genresId
                ];

                try {
                    await client.query(query, values);
                    console.log(`Inserted: ${JSON.stringify(movie)}`);
                } catch (err) {
                    console.error(`Error inserting data: ${err}`);
                }
            }

        } catch (err) {
            console.error(`Database connection error: ${err}`);
        } finally {
            await client.end();
            console.log('Disconnected from the database.');
        }
    },

    getOrInsertCastId: async function (client, castName) {
        if (!castName) return null;

        try {
            const res = await client.query('SELECT cast_id FROM "Casts" WHERE name = $1', [castName]);
            if (res.rows.length > 0) {
                return res.rows[0].cast_id;
            } else {
                const insertRes = await client.query('INSERT INTO "Casts" (name) VALUES ($1) RETURNING cast_id', [castName]);
                return insertRes.rows[0].cast_id;
            }
        } catch (err) {
            console.error(`Error getting/inserting cast: ${err}`);
            return null;
        }
    },

    getOrInsertGenresId: async function (client, genreName) {
        if (!genreName) return null;

        try {
            const res = await client.query('SELECT genres_id FROM "Genres" WHERE name = $1', [genreName]);
            if (res.rows.length > 0) {
                return res.rows[0].genres_id;
            } else {
                const insertRes = await client.query('INSERT INTO "Genres" (name) VALUES ($1) RETURNING genres_id', [genreName]);
                return insertRes.rows[0].genres_id;
            }
        } catch (err) {
            console.error(`Error getting/inserting genre: ${err}`);
            return null;
        }
    }
};

// Application Module
const ImporterApplication = {
    start: function () {
        HelloWorld.say();
        JSONObserver.list();

        // Start a minimal supervision tree (Simulated as there's no real equivalent in Node.js)
        console.log("Application started");
    }
};

// Start the application
ImporterApplication.start();
