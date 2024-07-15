import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Movie, MovieInsert, MoviesInsertSchema } from '../models/movies.model';
import { Prisma } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Movie[]> {
    const movies = await this.prisma.movies.findMany();
    return movies;
  }

  async findUnique(movie_id: number): Promise<Movie> {
    try {
      const movie = await this.prisma.movies.findUnique({
        where: {
          movie_id: movie_id,
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

      // Certifique-se que os campos estejam todos to tipo certo, corretamente e obrigatórios
      const newMovie = await this.prisma.movies.create({
        data: validatedMovies as Prisma.MoviesCreateInput,
      });

      return newMovie;
    } catch (error) {
      throw new Error('Erro ao inserir o movie: ' + error.message);
    }
  }

  async remove(movie_id: number): Promise<void> {
    try {
      await this.prisma.movies.delete({
        where: {
          movie_id: movie_id,
        },
      });
      return console.log('Movie apagado com sucesso');
    } catch (error) {
      throw new Error('Error ao apagar um filme: ' + JSON.stringify(error));
    }
  }
}
