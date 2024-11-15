import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from '../src/movies/movies.controller';
import { MoviesService } from '../src/movies/movies.service';
import { Movie } from '../src/movies/movie.entity';
import { ConflictException } from '@nestjs/common';

describe('MoviesController - Duplicate Movie Test', () => {
  let controller: MoviesController;
  let serviceMock: Partial<MoviesService>;

  beforeEach(async () => {
    // Mock para MoviesService
    serviceMock = {
      create: async (movie: Movie) => {
        if (movie.title === 'Duplicate Movie') {
          throw new ConflictException('Movie already exists');
        }
        return movie;
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: serviceMock }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should throw ConflictException for duplicate movie', async () => {
    const duplicateMovie: Movie = {
      title: 'Duplicate Movie', // Set the title to 'Duplicate Movie'
      description: 'Description of the duplicate movie',
      launchdate: new Date('2024-01-01'),
      showtimes: [
        new Date('2024-01-01T10:00:00'),
        new Date('2024-01-01T15:00:00'),
      ],
    };

    await expect(controller.create(duplicateMovie)).rejects.toThrow(ConflictException);
  });

  it('should allow creating a new, unique movie', async () => {
    const newMovie: Movie = {
      title: 'New Movie',
      description: 'Description of the new movie',
      launchdate: new Date('2024-01-01'),
      showtimes: [
        new Date('2024-01-01T10:00:00'),
        new Date('2024-01-01T15:00:00'),
      ],
    };

    const result = await controller.create(newMovie);
    expect(result).toEqual(newMovie);
  });
});