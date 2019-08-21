import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDto } from './../dto/book.dto';
import { Book } from '../entities/book.entity';
import * as _ from 'lodash';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<BookDto>,
    ) {}

    async all(): Promise<BookDto[]> {
        return await this.bookRepository.find();
    }

    async one(id: number): Promise<BookDto> {
        return await this.bookRepository.findOne(id);
    }

    async create(library: BookDto): Promise<BookDto> {
        return await this.bookRepository.save(library);
    }

    async update(id: number, book: BookDto): Promise<BookDto> {
        await this.bookRepository.update(id, _.pick(book, BookDto.manageable));

        if (book.genres) {
            const bookModel = await this.bookRepository.findOne(id);

            await this.bookRepository
                .createQueryBuilder()
                .relation(Book, 'genres')
                .of(bookModel)
                .addAndRemove(book.genres, bookModel.genres);

            /* this.bookRepository
                .createQueryBuilder()
                .relation(Book, "genres")
                .of(bookModel)
                .remove(bookModel.genres);
            this.bookRepository
                .createQueryBuilder()
                .relation(Book, "genres")
                .of(bookModel)
                .add(book.genres); */
        }

        return await this.bookRepository.findOne(id);
    }

    async delete(id: number): Promise<BookDto> {
        const library = await this.bookRepository.findOne(id);
        await this.bookRepository.delete(id);

        return library;
    }
}
