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

const MoviesInsertSchema = z.object({
  title: z.string(),
  year: z.coerce.number(),
  cast_name: z.string().optional(),
  genres_name: z.string().optional(),
  href: z.string().optional(),
  extract: z.string().optional(),
  thumbnail: z.string().optional(),
  thumbnail_width: z.coerce.number().optional(),
  thumbnail_height: z.coerce.number().optional(),
});

type MovieInsert = z.infer<typeof MoviesInsertSchema>;

const MoviesUpdateSchema = z.object({
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

type MovieUpdate = z.infer<typeof MoviesUpdateSchema>;

export {
  MoviesSchema,
  Movie,
  MovieIdSchema,
  MovieId,
  MoviesInsertSchema,
  MovieInsert,
  MoviesUpdateSchema,
  MovieUpdate,
};
