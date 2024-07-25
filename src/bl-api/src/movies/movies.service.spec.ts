import { expect } from 'chai';
import { MoviesService } from './movies.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';
import sinon from 'sinon';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    moviesService = new MoviesService(prismaService);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('findMany', () => {
    it('should return an array of movies', async () => {
      const mockMovies = [
        {
          movie_id: 1,
          title: 'Movie 1',
          year: 2020,
          cast: { name: 'Actor 1' },
          genres: { name: 'Genre 1' },
          href: 'http://example.com/movie1',
          extract: 'Extract 1',
          thumbnail: 'thumbnail1.jpg',
          thumbnail_width: 100,
          thumbnail_height: 100,
        },
      ];

      sinon.stub(prismaService.movies, 'findMany').resolves(mockMovies);

      const result = await moviesService.findMany();

      expect(result).to.deep.equal([
        {
          id: 1,
          title: 'Movie 1',
          year: 2020,
          cast: 'Actor 1',
          genres: 'Genre 1',
          href: 'http://example.com/movie1',
          extract: 'Extract 1',
          thumbnail: 'thumbnail1.jpg',
          thumbnail_width: 100,
          thumbnail_height: 100,
        },
      ]);
    });
  });

  describe('findUnique', () => {
    it('should return a movie by id', async () => {
      const mockMovie = {
        movie_id: 1,
        title: 'Movie 1',
        year: 2020,
        cast: { name: 'Actor 1' },
        genres: { name: 'Genre 1' },
        href: 'http://example.com/movie1',
        extract: 'Extract 1',
        thumbnail: 'thumbnail1.jpg',
        thumbnail_width: 100,
        thumbnail_height: 100,
      };

      sinon.stub(prismaService.movies, 'findUnique').resolves(mockMovie);

      const result = await moviesService.findUnique(1);

      expect(result).to.deep.equal(mockMovie);
    });

    it('should throw NotFoundException if movie not found', async () => {
      sinon.stub(prismaService.movies, 'findUnique').resolves(null);

      try {
        await moviesService.findUnique(1);
      } catch (error) {
        expect(error).to.be.instanceOf(NotFoundException);
        expect(error.message).to.equal('Movie with id 1 not found');
      }
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const mockMovieInsert = {
        title: 'New Movie',
        year: 2021,
        cast: { name: 'New Actor' },
        genres: { name: 'New Genre' },
        href: 'http://example.com/newmovie',
        extract: 'New Extract',
        thumbnail: 'newthumbnail.jpg',
        thumbnail_width: 200,
        thumbnail_height: 200,
      };

      const mockNewCast = { cast_id: 1, name: 'New Actor' };
      const mockNewGenre = { genres_id: 1, name: 'New Genre' };
      const mockNewMovie = {
        movie_id: 1,
        ...mockMovieInsert,
        cast_id: mockNewCast.cast_id,
        genres_id: mockNewGenre.genres_id,
      };

      sinon.stub(prismaService.casts, 'create').resolves(mockNewCast);
      sinon.stub(prismaService.genres, 'create').resolves(mockNewGenre);
      sinon.stub(prismaService.movies, 'create').resolves(mockNewMovie);

      const result = await moviesService.create(mockMovieInsert);

      expect(result).to.deep.equal(mockNewMovie);
    });
  });

  describe('update', () => {
    it('should update an existing movie', async () => {
      const movieId = 1;
      const mockMovieUpdate = {
        title: 'Updated Movie',
        year: 2022,
      };

      const mockUpdatedMovie = {
        movie_id: 1,
        ...mockMovieUpdate,
      };

      sinon.stub(prismaService.movies, 'update').resolves(mockUpdatedMovie);

      const result = await moviesService.update(movieId, mockMovieUpdate);

      expect(result).to.deep.equal(mockUpdatedMovie);
    });
  });

  describe('remove', () => {
    it('should delete a movie by id', async () => {
      const movieId = 1;

      const deleteStub = sinon.stub(prismaService.movies, 'delete').resolves();

      await moviesService.remove(movieId);

      expect(deleteStub.calledOnceWith({ where: { movie_id: movieId } })).to.be
        .true;
    });
  });
});
