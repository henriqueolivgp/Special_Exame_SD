import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  Movie,
  MovieId,
  MovieInsert,
  MoviesInsertSchema,
  MoviesUpdateSchema,
  MovieUpdate,
  MovieUpdateIdSchema,
  Casts,
  Genres,
} from '../models/movies.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Movie[]> {
    const movies = await this.prisma.movies.findMany({
      include: {
        cast: true,
        genres: true,
      },
    });
    return movies.map((movie) => ({
      id: movie.movie_id,
      title: movie.title,
      year: movie.year,
      cast: movie.cast.name, // Assuming movie.cast is an object with a name property
      genres: movie.genres.name, // Assuming movie.genres is an object with a name property
      href: movie.href,
      extract: movie.extract,
      thumbnail: movie.thumbnail,
      thumbnail_width: movie.thumbnail_width,
      thumbnail_height: movie.thumbnail_height,
    }));
  }

  async findUnique(movie_id: number): Promise<MovieId> {
    try {
      const movie = await this.prisma.movies.findUnique({
        where: {
          movie_id: movie_id,
        },
        include: {
          cast: true,
          genres: true,
        },
      });
      if (!movie) {
        throw new NotFoundException(`Movie with id ${movie_id} not found`);
      }
      return movie;
    } catch (error) {
      throw new Error('Ocorreu um erro ao tentar encontrar o filme');
    }
  }

  async create(movies: MovieInsert): Promise<MovieInsert> {
    try {
      // Valida o input conforme o zod schema
      const validatedMovies = MoviesInsertSchema.parse(movies);

      // Cria novo cast
      const newCast = await this.prisma.casts.create({
        data: {
          name: validatedMovies.cast.name,
        },
      });

      // Cria novo genre
      const newGenre = await this.prisma.genres.create({
        data: {
          name: validatedMovies.genres.name,
        },
      });

      // Cria novo filme com os IDs de cast e genres
      const newMovie = await this.prisma.movies.create({
        data: {
          title: validatedMovies.title,
          year: validatedMovies.year,
          cast_id: newCast.cast_id,
          genres_id: newGenre.genres_id,
          href: validatedMovies.href,
          extract: validatedMovies.extract,
          thumbnail: validatedMovies.thumbnail,
          thumbnail_width: validatedMovies.thumbnail_width,
          thumbnail_height: validatedMovies.thumbnail_height,
        } as Prisma.MoviesCreateInput,
        include: {
          cast: true,
          genres: true,
        },
      });

      return newMovie;
    } catch (error) {
      throw new Error('Erro ao inserir o filme: ' + error.message);
    }
  }

  async update(movieId: number, movie: MovieUpdate): Promise<MovieUpdate> {
    try {
      console.log('Atualizando o filme no serviço com ID:', movieId);
      console.log('Dados do filme:', movie);

      // Validar o ID do filme
      const validatedMovieID = MovieUpdateIdSchema.parse({ movie_id: movieId });

      // Validar os dados do filme
      const validatedMovieUpdate = MoviesUpdateSchema.parse(movie);

      // Atualizar os dados do filme conforme necessário
      const dataToUpdate: any = {};
      if (validatedMovieUpdate.title)
        dataToUpdate.title = validatedMovieUpdate.title;
      if (validatedMovieUpdate.year)
        dataToUpdate.year = validatedMovieUpdate.year;
      if (validatedMovieUpdate.href)
        dataToUpdate.href = validatedMovieUpdate.href;
      if (validatedMovieUpdate.extract)
        dataToUpdate.extract = validatedMovieUpdate.extract;
      if (validatedMovieUpdate.thumbnail)
        dataToUpdate.thumbnail = validatedMovieUpdate.thumbnail;
      if (validatedMovieUpdate.thumbnail_width)
        dataToUpdate.thumbnail_width = validatedMovieUpdate.thumbnail_width;
      if (validatedMovieUpdate.thumbnail_height)
        dataToUpdate.thumbnail_height = validatedMovieUpdate.thumbnail_height;

      // Atualizar o cast se fornecido
      if (validatedMovieUpdate.cast) {
        const updatedCast = validatedMovieUpdate.cast.cast_id
          ? await this.prisma.casts.update({
              where: { cast_id: validatedMovieUpdate.cast.cast_id },
              data: { name: validatedMovieUpdate.cast.name },
            })
          : await this.prisma.casts.create({
              data: { name: validatedMovieUpdate.cast.name },
            });
        dataToUpdate.cast_id = updatedCast.cast_id;
      }

      // Atualizar o genre se fornecido
      if (validatedMovieUpdate.genres) {
        const updatedGenre = validatedMovieUpdate.genres.genres_id
          ? await this.prisma.genres.update({
              where: { genres_id: validatedMovieUpdate.genres.genres_id },
              data: { name: validatedMovieUpdate.genres.name },
            })
          : await this.prisma.genres.create({
              data: { name: validatedMovieUpdate.genres.name },
            });
        dataToUpdate.genres_id = updatedGenre.genres_id;
      }

      // Atualizar o filme com os dados
      const updatedMovie = await this.prisma.movies.update({
        where: {
          movie_id: validatedMovieID.movie_id,
        },
        data: dataToUpdate,
        include: {
          cast: true,
          genres: true,
        },
      });

      console.log('dados do update', updatedMovie);

      return updatedMovie;
    } catch (error) {
      throw new Error('Erro ao atualizar o filme no serviço: ' + error.message);
    }
  }

  async remove(movie_id: number): Promise<void> {
    try {
      await this.prisma.movies.delete({
        where: {
          movie_id: movie_id,
        },
      });
      console.log('Movie apagado com sucesso');
    } catch (error) {
      console.error('Error ao apagar um filme:', error);
      throw new Error('Error ao apagar um filme: ' + JSON.stringify(error));
    }
  }

  async findCastsByMovieId(movie_id: number): Promise<Casts[]> {
    try {
      const movie = await this.prisma.movies.findUnique({
        where: {
          movie_id: movie_id,
        },
        include: {
          cast: true,
        },
      });

      if (!movie) {
        throw new NotFoundException(`Movie with id ${movie_id} not found`);
      }

      const casts = await this.prisma.casts.findMany({
        where: {
          cast_id: movie.cast.cast_id,
        },
      });
      console.log('casts: ' + casts);

      // Assegura que movie.cast é um array
      return casts || [];
    } catch (error) {
      throw new Error(
        `Error fetching casts for movie ${movie_id}: ${error.message}`,
      );
    }
  }

  async findGenresByMovieId(movie_id: number): Promise<Genres[]> {
    try {
      const movie = await this.prisma.movies.findUnique({
        where: {
          movie_id: movie_id,
        },
        include: {
          genres: true, // Inclui os gêneros associados ao filme
        },
      });

      if (!movie) {
        throw new NotFoundException(`Movie with id ${movie_id} not found`);
      }

      // Verifica se genres é um array ou um único objeto
      const genres = Array.isArray(movie.genres)
        ? movie.genres
        : [movie.genres];

      // Processa cada genre para garantir que name é uma string simples
      const processedGenres = genres.map((genre) => ({
        genres_id: genre.genres_id,
        name:
          typeof genre.name === 'string' ? genre.name : JSON.parse(genre.name),
      }));

      return processedGenres;
    } catch (error) {
      throw new Error(
        `Error fetching genres for movie ${movie_id}: ${error.message}`,
      );
    }
  }

  // Atualizar um cast específico
  async updateCast(
    movie_id: number,
    cast_id: number,
    castData: Partial<Casts>,
  ): Promise<Casts> {
    try {
      const movie = await this.prisma.movies.findUnique({
        where: { movie_id },
        include: { cast: true },
      });

      if (!movie) {
        throw new NotFoundException(`Movie with id ${movie_id} not found`);
      }

      const casts = Array.isArray(movie.cast) ? movie.cast : [movie.cast];
      const cast = casts.find((c) => c.cast_id === cast_id);

      if (!cast) {
        throw new NotFoundException(
          `Cast with id ${cast_id} not found for movie ${movie_id}`,
        );
      }

      const updatedCast = await this.prisma.casts.update({
        where: { cast_id },
        data: castData,
      });

      return updatedCast;
    } catch (error) {
      throw new Error(
        `Error updating cast ${cast_id} for movie ${movie_id}: ${error.message}`,
      );
    }
  }
}
