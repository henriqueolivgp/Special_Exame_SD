import {
  // BadRequestException,
  // Body,
  Controller,
  Delete,
  Get,
  Param,
  // Post,
} from '@nestjs/common';
import { CastsService } from './casts.service';
import {
  Casts,
  // CastsInsert,
  // CastsIdSchema,
} from '../models/casts.model';
@Controller('casts')
export class CastsController {
  constructor(private readonly castsService: CastsService) {}

  @Get()
  async findAll(): Promise<Casts[]> {
    return this.castsService.findMany();
  }

  // @Get(':cast_id')
  // async findUnique(@Param('cast_id') cast_id: number): Promise<Casts> {
  //   try {
  //     const { cast_id: validatedMovieId } = CastsIdSchema.parse({ cast_id });
  //     const movie = this.castsService.findUnique(validatedMovieId);
  //     return movie;
  //   } catch (error) {}
  // }

  // @Post()
  // async create(@Body() casts: CastsInsert): Promise<Casts> {
  //   try {
  //     // Validação dos dados de entrada utilizando Zod
  //     // const parsedBody: MovieInsert = MoviesInsertSchema.parse(movies);
  //     // const cast = await this.castsService.create(parsedBody.cast_name);
  //     // Chama o serviço para criar o filme
  //     const newMovie = await this.castsService.create({
  //       ...casts,
  //       // cast_name: ,
  //     });
  //     return newMovie;
  //   } catch (error) {
  //     if (error) {
  //       // Se houver erro de validação, lance uma exceção BadRequestException
  //       throw new BadRequestException(error.errors);
  //     } else {
  //       // Lance outros erros como exceções genéricas
  //       throw new Error(error.message);
  //     }
  //   }
  // }

  // @Put(':movie_id')
  // async update(
  //   @Param('movie_id') movie_id: number,
  //   @Body() updateMovieDto: any,
  // ): Promise<Movie> {
  //   const parsedMovie = MoviesUpdateSchema.partial().parse(updateMovieDto);
  //   return this.castsService.update(movie_id, parsedMovie);
  // }

  @Delete(':cast_id')
  async remove(@Param('cast_id') cast_id: number): Promise<void> {
    try {
      this.castsService.remove(cast_id);
    } catch (error) {
      throw new Error('Error a apagar casts');
    }
  }
}
