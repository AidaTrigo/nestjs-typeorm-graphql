import { Resolver, Query, ResolveProperty, Parent, Args, Mutation } from '@nestjs/graphql';
import { BookService } from '../services/book.service';
import { Book } from 'src/graphql';
import { BookDto } from '../dto/book.dto';
import { InputType, Field } from 'type-graphql';

@Resolver('Book')
export class BookResolver {
    constructor(
        private readonly bookService: BookService,
    ) {}

    @Query()
    async book(@Args('id') id: number): Promise<Book> {
        return await this.bookService.one(id);
    }

    @Query()
    async books(): Promise<Book[]> {
        return await this.bookService.all();
    }

    @Mutation()
    async newBook(@Args('book') book: BookDto): Promise<Book> {
        return await this.bookService.create(book);
    }

    @Mutation()
    async updateBook(@Args('id') id: number, @Args('book') book: BookDto): Promise<Book> {
        return await this.bookService.update(id, book);
    }

    @Mutation()
    async deleteBook(@Args('id') id: number): Promise<Book> {
        return await this.bookService.delete(id);
    }
}
