// src/movies/movie.model.ts

import { z } from 'zod';

const MoviesSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  year: z.coerce.number(),
  cast: z.string().optional(),
  genres: z.string().optional(),
  href: z.string().optional(),
  extract: z.string().optional(),
  thumbnail: z.string().optional(),
  thumbnail_width: z.coerce.number().optional(),
  thumbnail_height: z.coerce.number().optional(),
});

type Movie = z.infer<typeof MoviesSchema>;

const MovieIdSchema = z.object({
  movie_id: z.coerce.number(),
});

type MovieId = z.infer<typeof MovieIdSchema>;

const CastsInsertSchema = z.object({
  cast_id: z.coerce.number().optional(),
  name: z.string(),
});

const GenresInsertSchema = z.object({
  genres_id: z.coerce.number().optional(),
  name: z.string(),
});

const MoviesInsertSchema = z.object({
  title: z.string(),
  year: z.coerce.number(),
  cast: CastsInsertSchema,
  genres: GenresInsertSchema,
  href: z.string().optional(),
  extract: z.string().optional(),
  thumbnail: z.string().optional(),
  thumbnail_width: z.coerce.number().optional(),
  thumbnail_height: z.coerce.number().optional(),
});

type MovieInsert = z.infer<typeof MoviesInsertSchema>;

const CastsUpdateSchema = z.object({
  cast_id: z.coerce.number().optional(),
  name: z.string(),
});

const GenresUpdateSchema = z.object({
  genres_id: z.coerce.number().optional(),
  name: z.string(),
});

const MovieUpdateIdSchema = z.object({
  movie_id: z.coerce.number(),
});

const MoviesUpdateSchema = z.object({
  title: z.string().optional(),
  year: z.coerce.number().optional(),
  cast: CastsUpdateSchema.optional(),
  genres: GenresUpdateSchema.optional(),
  href: z.string().optional(),
  extract: z.string().optional(),
  thumbnail: z.string().optional(),
  thumbnail_width: z.coerce.number().optional(),
  thumbnail_height: z.coerce.number().optional(),
});

type MovieUpdate = z.infer<typeof MoviesUpdateSchema>;

const CastsSchema = z.object({
  cast_id: z.coerce.number().optional(),
  name: z.string(),
});
const GenresSchema = z.object({
  genres_id: z.coerce.number().optional(),
  name: z.string().optional(),
});
const MoviesCastSchema = z.object({
  title: z.string().optional(),
  year: z.coerce.number().optional(),
  cast: CastsSchema.optional(),
  genres: GenresSchema.optional(),
  href: z.string().optional(),
  extract: z.string().optional(),
  thumbnail: z.string().optional(),
  thumbnail_width: z.coerce.number().optional(),
  thumbnail_height: z.coerce.number().optional(),
});
type MoviesCasts = z.infer<typeof MoviesCastSchema>;

type Casts = z.infer<typeof CastsSchema>;

type Genres = z.infer<typeof GenresSchema>;

export {
  MoviesSchema,
  Movie,
  MovieIdSchema,
  MovieId,
  MovieInsert,
  MoviesInsertSchema,
  MoviesUpdateSchema,
  MovieUpdate,
  MovieUpdateIdSchema,
  Casts,
  CastsSchema,
  Genres,
  GenresSchema,
  MoviesCasts,
  MoviesCastSchema,
};
