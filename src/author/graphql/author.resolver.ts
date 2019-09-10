import { Resolver, Query, ResolveProperty, Parent, Args, Mutation } from '@nestjs/graphql';
import { AuthorService } from '../services/author.service';
import { Author } from 'src/graphql';
import { AuthorDto } from '../dto/author.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth-guard';

@Resolver('Author')
export class AuthorResolver {
    constructor(
        private readonly authorService: AuthorService,
    ) {}

    @Query()
    @UseGuards(GqlAuthGuard)
    async author(@Args('id') id: number): Promise<Author> {
        return await this.authorService.one(id);
    }

    @Query()
    @UseGuards(GqlAuthGuard)
    async authors(): Promise<Author[]> {
        return await this.authorService.all();
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    async newAuthor(@Args('author') author: AuthorDto): Promise<Author> {
        return await this.authorService.create(author);
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    async updateAuthor(@Args('id') id: number, @Args('author') author: AuthorDto): Promise<Author> {
        return await this.authorService.update(id, author);
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    async deleteAuthor(@Args('id') id: number): Promise<Author> {
        return await this.authorService.delete(id);
    }
}
