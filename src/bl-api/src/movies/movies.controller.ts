import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import {
  Casts,
  CastsSchema,
  Genres,
  Movie,
  MovieId,
  MovieIdSchema,
  MovieInsert,
  MoviesInsertSchema,
  MoviesUpdateSchema,
  MovieUpdate,
} from '../models/movies.model';
import { JwtAuthGuard } from 'src/jwt/jwt.auth.guard';
import { RolesGuard } from '../middlewares/VerifyRoles';
import { Roles } from 'src/decorator/rolesDecorator';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'view')
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findMany();
  }

  @Get(':movie_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'view')
  async findUnique(@Param('movie_id') movie_id: number): Promise<MovieId> {
    try {
      const { movie_id: validatedMovieId } = MovieIdSchema.parse({ movie_id });

      const movie = this.moviesService.findUnique(validatedMovieId);
      return movie;
    } catch (error) {
      throw new Error('Error no controller get by id movie');
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() movies: MovieInsert) {
    try {
      // Valida o input conforme o schema Zod
      const validatedInsertMovies = MoviesInsertSchema.parse(movies);

      // Chama o serviço para criar o filme e o elenco
      const newMovie = await this.moviesService.create(validatedInsertMovies);

      // Retorna a resposta com o novo filme criado
      return { newMovie };
    } catch (error) {
      throw new Error('Erro ao criar o filme e o elenco: ' + error.message);
    }
  }

  @Put(':movie_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'edit')
  async updateMovie(
    @Param('movie_id') movie_id: number,
    @Body() movie: MovieUpdate,
  ): Promise<MovieUpdate> {
    try {
      console.log('Atualizando o filme com ID:', movie_id);
      console.log('Dados do filme:', movie);

      const validatedMovie = MoviesUpdateSchema.parse(movie);
      const updatedMovie = await this.moviesService.update(
        movie_id,
        validatedMovie,
      );
      return updatedMovie;
    } catch (error) {
      throw new Error(
        'Erro ao atualizar o filme no controller: ' + error.message,
      );
    }
  }

  @Delete(':movie_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('movie_id') movie_id: number): Promise<void> {
    try {
      const { movie_id: validatedMovieId } = MovieIdSchema.parse({ movie_id });
      await this.moviesService.remove(validatedMovieId);
    } catch (error) {
      console.error('Error ao apagar o filme:', error);
      throw new Error('Error ao apagar movie');
    }
  }

  @Get(':movie_id/casts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'view')
  async getCasts(@Param('movie_id') movie_id: number): Promise<Casts[]> {
    const { movie_id: validatedMovieId } = MovieIdSchema.parse({ movie_id });
    return this.moviesService.findCastsByMovieId(validatedMovieId);
  }

  @Get(':movie_id/genres')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'view')
  async getGenres(@Param('movie_id') movie_id: number): Promise<Genres[]> {
    const { movie_id: validatedMovieId } = MovieIdSchema.parse({ movie_id });
    return this.moviesService.findGenresByMovieId(validatedMovieId);
  }

  @Put(':movie_id/casts/:cast_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'edit')
  async updateCast(
    @Param('movie_id') movie_id: number,
    @Param('cast_id') cast_id: number,
    @Body() castData: Partial<Casts>,
  ): Promise<Casts> {
    const { movie_id: validatedMovieId } = MovieIdSchema.parse({ movie_id });
    const { cast_id: validatedCastId } = CastsSchema.pick({
      cast_id: true,
    }).parse({ cast_id });
    const validatedCast = CastsSchema.partial().parse(castData);
    return this.moviesService.updateCast(
      validatedMovieId,
      validatedCastId,
      validatedCast,
    );
  }
}
