import { Test } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './services/genre.service';
import { Genre } from './entities/genre.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GenreController', () => {
    let genreController: GenreController;
    let genreService: GenreService;

    const mockRepository = jest.fn(() => ({
        metadata: {
            columns: [],
            relations: [],
        },
    }));

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [
                GenreController,
            ],
            providers: [
                GenreService,
                {
                    provide: getRepositoryToken(Genre),
                    useValue: mockRepository,
                },
                {
                    provide: getRepositoryToken(Genre),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        genreService = module.get<GenreService>(GenreService);
        genreController = module.get<GenreController>(GenreController);
    });

    describe('all', () => {
        it('GenreController should be defined', () => {
            expect(genreController).toBeDefined();
        });

        it('should return an array of genres', async () => {
            const result = [
                {
                    id: 1,
                    name: 'Fantasy',
                },
                {
                    id: 2,
                    name: 'Science Fiction',
                },
            ];

            jest.spyOn(genreService, 'all').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await genreController.all()).toBe(result);
        });
    });

    describe('one', () => {
        it('GenreController should be defined', () => {
            expect(genreController).toBeDefined();
        });

        it('should return one genre', async () => {
            const result = {
                    id: 1,
                    name: 'Fantasy',
                };

            jest.spyOn(genreService, 'one').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await genreController.one(1)).toBe(result);
        });
    });

    describe('create', () => {
        it('GenreController should be defined', () => {
            expect(genreController).toBeDefined();
        });

        it('should return created genre', async () => {
            const genre = {
                    id: 1,
                    name: 'Fantasy',
                };

            jest.spyOn(genreService, 'create').mockImplementation(() => new Promise(resolve => resolve(genre)));
            expect(await genreController.create(genre)).toBe(genre);
        });
    });

    describe('update', () => {
        it('GenreController should be defined', () => {
            expect(genreController).toBeDefined();
        });

        it('should return updated genre', async () => {
            const result = {
                    id: 1,
                    name: 'Science Fiction',
                };

            jest.spyOn(genreService, 'update').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await genreController.update(1, result)).toBe(result);
        });
    });

    describe('delete', () => {
        it('GenreController should be defined', () => {
            expect(genreController).toBeDefined();
        });

        it('should return deleted genre', async () => {
            const result = {
                    id: 1,
                    name: 'Fantasy',
                };

            jest.spyOn(genreService, 'delete').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await genreController.delete(1)).toBe(result);
        });
    });
});
