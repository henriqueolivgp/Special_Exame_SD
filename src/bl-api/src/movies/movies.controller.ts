import {
  BadRequestException,
  Body,
  // Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  // Post,
  // Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
// import { CastsService } from 'src/casts/casts.service';
import {
  Movie,
  MovieIdSchema,
  MoviesInsertSchema,
  MovieInsert,
  // MoviesInsertSchema,
  // MoviesUpdateSchema,
} from '../models/movies.model';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    // private readonly castsService: CastsService,
  ) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findMany();
  }

  @Get(':movie_id')
  async findUnique(@Param('movie_id') movie_id: number): Promise<Movie> {
    try {
      const { movie_id: validatedMovieId } = MovieIdSchema.parse({ movie_id });
      const movie = this.moviesService.findUnique(validatedMovieId);
      return movie;
    } catch (error) {}
  }

  @Post()
  async create(@Body() body: MovieInsert): Promise<any> {
    try {
      // Validação dos dados de entrada utilizando Zod
      const parsedBody: MovieInsert = MoviesInsertSchema.parse(body);

      // const cast = await this.castsService.create(parsedBody.cast_name);

      // Chama o serviço para criar o filme
      const newMovie = await this.moviesService.create(
        parsedBody.title,
        parsedBody.year,
        parsedBody.cast_name,
        parsedBody.genres_name,
        parsedBody.href,
        parsedBody.extract,
        parsedBody.thumbnail,
        parsedBody.thumbnail_width,
        parsedBody.thumbnail_height,
      );

      return newMovie;
    } catch (error) {
      if (error) {
        // Se houver erro de validação, lance uma exceção BadRequestException
        throw new BadRequestException(error.errors);
      } else {
        // Lance outros erros como exceções genéricas
        throw new Error(error.message);
      }
    }
  }

  // @Put(':movie_id')
  // async update(
  //   @Param('movie_id') movie_id: number,
  //   @Body() updateMovieDto: any,
  // ): Promise<Movie> {
  //   const parsedMovie = MoviesUpdateSchema.partial().parse(updateMovieDto);
  //   return this.moviesService.update(movie_id, parsedMovie);
  // }

  @Delete(':id')
  async remove(@Param('movie_id') movie_id: number): Promise<void> {
    return this.moviesService.remove(movie_id);
  }
}
