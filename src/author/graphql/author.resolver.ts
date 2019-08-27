import { Resolver, Query, ResolveProperty, Parent, Args, Mutation } from '@nestjs/graphql';
import { AuthorService } from '../services/author.service';
import { Author } from 'src/graphql';
import { AuthorDto } from '../dto/author.dto';

@Resolver('Author')
export class AuthorResolver {
    constructor(
        private readonly authorService: AuthorService,
    ) {}

    @Query()
    async author(@Args('id') id: number): Promise<Author> {
        return await this.authorService.one(id);
    }

    @Query()
    async authors(): Promise<Author[]> {
        return await this.authorService.all();
    }

    @Mutation()
    async newAuthor(@Args('author') author: AuthorDto): Promise<Author> {
        return await this.authorService.create(author);
    }

    @Mutation()
    async updateAuthor(@Args('id') id: number, @Args('author') author: AuthorDto): Promise<Author> {
        return await this.authorService.update(id, author);
    }

    @Mutation()
    async deleteAuthor(@Args('id') id: number): Promise<Author> {
        return await this.authorService.delete(id);
    }
}
