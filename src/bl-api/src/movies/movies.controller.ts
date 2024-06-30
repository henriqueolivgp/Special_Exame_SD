import {
  // Body,
  Controller,
  Delete,
  Get,
  Param,
  // Post,
  // Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  Movie,
  // MoviesInsertSchema,
  // MoviesUpdateSchema,
} from '../models/movies.model';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findMany();
  }

  @Get(':movie_id')
  async findUnique(@Param('movie_id') movie_id: number): Promise<Movie> {
    return this.moviesService.findUnique(movie_id);
  }

  // @Post()
  // async create(@Body() createMovieDto: any): Promise<Movie> {
  //   const parsedMovie = MoviesInsertSchema.parse(createMovieDto);
  //   return this.moviesService.create(parsedMovie);
  // }

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
