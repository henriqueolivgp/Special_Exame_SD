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

  async create(
    title: string,
    year: number,
    cast_name: string,
    genres_name: string,
    href: string,
    extract: string,
    thumbnail: string,
    thumbnailWidth: number,
    thumbnailHeight: number,
  ): Promise<Movie> {
    try {
      const newCasts = await this.prisma.casts.create({
        data: {
          name: cast_name,
        },
      });

      const newGenres = await this.prisma.genres.create({
        data: {
          name: genres_name,
        },
      });

      const newMovie = await this.prisma.movies.create({
        data: {
          title,
          year,
          cast: {
            connect: { cast_id: newCasts.cast_id },
          },
          genres: {
            connect: { genres_id: newGenres.genres_id },
          },
          href,
          extract,
          thumbnail,
          thumbnail_width: thumbnailWidth,
          thumbnail_height: thumbnailHeight,
        },
      });
      return newMovie;
    } catch (error) {
      throw new Error('Erro ao inserir o movie');
    }
  }

  async remove(movie_id: number): Promise<void> {
    await this.prisma.movies.delete({
      where: { movie_id: movie_id },
    });
  }
}
