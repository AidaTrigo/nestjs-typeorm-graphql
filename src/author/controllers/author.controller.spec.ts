import { Test } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from '../services/author.service';
import { Author } from '../entities/author.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthorController', () => {
    let authorController: AuthorController;
    let authorService: AuthorService;

    const mockRepository = jest.fn(() => ({
        metadata: {
            columns: [],
            relations: [],
        },
    }));

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [
                AuthorController,
            ],
            providers: [
                AuthorService,
                {
                    provide: getRepositoryToken(Author),
                    useValue: mockRepository,
                },
                {
                    provide: getRepositoryToken(Author),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        authorService = module.get<AuthorService>(AuthorService);
        authorController = module.get<AuthorController>(AuthorController);
    });

    describe('all', () => {
        it('AuthorController should be defined', () => {
            expect(authorController).toBeDefined();
        });

        it('should return an array of authors', async () => {
            const result = [
                {
                    id: 1,
                    name: 'Sarah',
                },
                {
                    id: 2,
                    name: 'Eric',
                },
            ];

            jest.spyOn(authorService, 'all').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await authorController.all()).toBe(result);
        });
    });

    describe('one', () => {
        it('AuthorController should be defined', () => {
            expect(authorController).toBeDefined();
        });

        it('should return one author', async () => {
            const result = {
                id: 1,
                name: 'Sarah',
            };

            jest.spyOn(authorService, 'one').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await authorController.one(1)).toBe(result);
        });
    });

    describe('create', () => {
        it('AuthorController should be defined', () => {
            expect(authorController).toBeDefined();
        });

        it('should return created author', async () => {
            const author = {
                id: 1,
                name: 'Sarah',
            };

            jest.spyOn(authorService, 'create').mockImplementation(() => new Promise(resolve => resolve(author)));
            expect(await authorController.create(author)).toBe(author);
        });
    });

    describe('update', () => {
        it('AuthorController should be defined', () => {
            expect(authorController).toBeDefined();
        });

        it('should return updated author', async () => {
            const author = {
                id: 1,
                name: 'Sarah',
            };

            jest.spyOn(authorService, 'update').mockImplementation(() => new Promise(resolve => resolve(author)));
            expect(await authorController.update(1, author)).toBe(author);
        });
    });

    describe('delete', () => {
        it('AuthorController should be defined', () => {
            expect(authorController).toBeDefined();
        });

        it('should return deleted author', async () => {
            const result = {
                    id: 1,
                    name: 'Sarah',
                };

            jest.spyOn(authorService, 'delete').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await authorController.delete(1)).toBe(result);
        });
    });
});
