import { Test } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from '../services/book.service';
import { Book } from '../entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BookController', () => {
    let bookController: BookController;
    let bookService: BookService;

    const mockRepository = jest.fn(() => ({
        metadata: {
            columns: [],
            relations: [],
        },
    }));

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [
                BookController,
            ],
            providers: [
                BookService,
                {
                    provide: getRepositoryToken(Book),
                    useValue: mockRepository,
                },
                {
                    provide: getRepositoryToken(Book),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        bookService = module.get<BookService>(BookService);
        bookController = module.get<BookController>(BookController);
    });

    describe('all', () => {
        it('BookController should be defined', () => {
            expect(bookController).toBeDefined();
        });

        it('should return an array of books', async () => {
            const result = [
                {
                    id: 1,
                    name: 'The Circle',
                    author: {
                        id: 1,
                        name: 'Sarah',
                        books: [],
                    },
                    genres: [],
                },
                {
                    id: 2,
                    name: 'Fire',
                    author: {
                        id: 1,
                        name: 'Sarah',
                        books: [],
                    },
                    genres: [],
                },
            ];

            jest.spyOn(bookService, 'all').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await bookController.all()).toBe(result);
        });
    });

    describe('one', () => {
        it('BookController should be defined', () => {
            expect(bookController).toBeDefined();
        });

        it('should return one book', async () => {
            const result = {
                    id: 1,
                    name: 'The Circle',
                    author: {
                        id: 1,
                        name: 'Sarah',
                        books: [],
                    },
                    genres: [],
                };

            jest.spyOn(bookService, 'one').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await bookController.one(1)).toBe(result);
        });
    });

    describe('create', () => {
        it('BookController should be defined', () => {
            expect(bookController).toBeDefined();
        });

        it('should return created book', async () => {
            const book = {
                    id: 1,
                    name: 'The Circle',
                    author: {
                        id: 1,
                        name: 'Sarah',
                        books: [],
                    },
                    genres: [],
                };

            jest.spyOn(bookService, 'create').mockImplementation(() => new Promise(resolve => resolve(book)));
            expect(await bookController.create(book)).toBe(book);
        });
    });

    describe('update', () => {
        it('BookController should be defined', () => {
            expect(bookController).toBeDefined();
        });

        it('should return updated book', async () => {
            const result = {
                    id: 1,
                    name: 'The Circle: Engelfors Triology I',
                    author: {
                        id: 1,
                        name: 'Sarah',
                        books: [],
                    },
                    genres: [],
                };

            jest.spyOn(bookService, 'update').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await bookController.update(1, result)).toBe(result);
        });
    });

    describe('delete', () => {
        it('BookController should be defined', () => {
            expect(bookController).toBeDefined();
        });

        it('should return deleted book', async () => {
            const result = {
                    id: 1,
                    name: 'The Circle',
                    author: {
                        id: 1,
                        name: 'Sarah',
                        books: [],
                    },
                    genres: [],
                };

            jest.spyOn(bookService, 'delete').mockImplementation(() => new Promise(resolve => resolve(result)));
            expect(await bookController.delete(1)).toBe(result);
        });
    });
});
