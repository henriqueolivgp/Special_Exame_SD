import { Injectable } from '@nestjs/common'; // NotFoundException
import { PrismaService } from '../prisma.service';
import { Casts } from '../models/casts.model';
// import { Prisma } from '@prisma/client';

@Injectable()
export class CastsService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Casts[]> {
    try {
      const casts = await this.prisma.casts.findMany();
      return casts;
    } catch (error) {
      throw new Error('Error ao encontrar todos os casts');
    }
  }

  // async findUnique(movie_id: number): Promise<Movie> {
  //   try {
  //     const movie = await this.prisma.movies.findUnique({
  //       where: {
  //         movie_id: movie_id,
  //       },
  //     });
  //     if (!movie) {
  //       throw new NotFoundException(`Movie with id ${movie_id} not found`);
  //     }
  //     return movie;
  //   } catch (error) {
  //     throw new Error('Ocorreu um erro ao tentar encontrar o filme');
  //   }
  // }

  // async create(movies: MovieInsert): Promise<MovieInsert> {
  //   try {
  //     // Valida o input conforme o zod schema
  //     const validatedMovies = MoviesInsertSchema.parse(movies);

  //     // Certifique-se que os campos estejam todos to tipo certo, corretamente e obrigatórios
  //     const newMovie = await this.prisma.movies.create({
  //       data: validatedMovies as Prisma.MoviesCreateInput,
  //     });

  //     return newMovie;
  //   } catch (error) {
  //     throw new Error('Erro ao inserir o movie: ' + error.message);
  //   }
  // }

  async remove(cast_id: number): Promise<void> {
    try {
      await this.prisma.casts.delete({
        where: {
          cast_id: cast_id,
        },
      });
      return console.log('Movie apagado com sucesso');
    } catch (error) {
      throw new Error('Error ao apagar um filme: ' + JSON.stringify(error));
    }
  }
}
