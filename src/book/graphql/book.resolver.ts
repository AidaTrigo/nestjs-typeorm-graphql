import { Resolver, Query, ResolveProperty, Parent, Args, Mutation } from '@nestjs/graphql';
import { BookService } from '../services/book.service';
import { Book } from 'src/graphql';
import { BookDto } from '../dto/book.dto';
import { InputType, Field } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth-guard';

@Resolver('Book')
export class BookResolver {
    constructor(
        private readonly bookService: BookService,
    ) {}

    @Query()
    @UseGuards(GqlAuthGuard)
    async book(@Args('id') id: number): Promise<Book> {
        return await this.bookService.one(id);
    }

    @Query()
    @UseGuards(GqlAuthGuard)
    async books(): Promise<Book[]> {
        return await this.bookService.all();
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    async newBook(@Args('book') book: BookDto): Promise<Book> {
        return await this.bookService.create(book);
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    async updateBook(@Args('id') id: number, @Args('book') book: BookDto): Promise<Book> {
        return await this.bookService.update(id, book);
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    async deleteBook(@Args('id') id: number): Promise<Book> {
        return await this.bookService.delete(id);
    }
}
