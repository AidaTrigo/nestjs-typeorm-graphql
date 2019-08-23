import { Resolver, Query, ResolveProperty, Parent, Args } from '@nestjs/graphql';
import { AuthorService } from '../services/author.service';
import { Author } from 'src/graphql';

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
}
