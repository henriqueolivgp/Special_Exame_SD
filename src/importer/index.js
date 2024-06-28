// Import necessary modules
const fs = require('fs');
const path = require('path');

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

    parse: function (content) {
        console.log(`JSON Content of the file: \n${content}`);
        try {
            const items = JSON.parse(content).map(item => ({
                name: item.name[0],
                description: item.description[0]
            }));

            console.log(items);

        } catch (err) {
            console.error(`Error parsing JSON: ${err}`);
            return;
        }
    },

    // insertToDatabase: async function(items) {
    //     const client = new Client(dbConfig);

    //     try {
    //         await client.connect();
    //         console.log('Connected to the database.');

    //         for (const item of items) {
    //             const query = 'INSERT INTO your_table_name (name, description) VALUES ($1, $2)';
    //             const values = [item.name, item.description];

    //             try {
    //                 await client.query(query, values);
    //                 console.log(`Inserted: ${JSON.stringify(item)}`);
    //             } catch (err) {
    //                 console.error(`Error inserting data: ${err}`);
    //             }
    //         }

    //     } catch (err) {
    //         console.error(`Database connection error: ${err}`);
    //     } finally {
    //         await client.end();
    //         console.log('Disconnected from the database.');
    //     }
    // }


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
