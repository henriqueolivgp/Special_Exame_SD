import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Movie } from '../models/movies.model';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Movie[]> {
    const movies = await this.prisma.movies.findMany();
    return movies;
  }

  async findUnique(movie_id: number): Promise<Movie> {
    const movie = await this.prisma.movies.findUnique({
      where: { movie_id },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${movie_id} not found`);
    }
    return movie;
  }

  // async create(movie: Movie): Promise<Movie> {
  //   return this.prisma.movies.create({
  //     data: movie,
  //   });
  // }

  // async update(
  //   movie_id: number,
  //   MoviesUpdateSchema: Partial<Movie>,
  // ): Promise<Movie> {
  //   const movie = await this.prisma.movies.update({
  //     where: { movie_id },
  //     data: MoviesUpdateSchema,
  //   });
  //   return movie;
  // }

  async remove(movie_id: number): Promise<void> {
    await this.prisma.movies.delete({
      where: { movie_id },
    });
  }
}
