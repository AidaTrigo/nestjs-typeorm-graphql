import { Resolver, Query, ResolveProperty, Parent, Args } from '@nestjs/graphql';
import { GenreService } from '../services/genre.service';
import { Genre } from 'src/graphql';

@Resolver('Genre')
export class GenreResolver {
    constructor(
        private readonly genreService: GenreService,
    ) {}

    @Query()
    async genre(@Args('id') id: number): Promise<Genre> {
        return await this.genreService.one(id);
    }

    @Query()
    async genres(): Promise<Genre[]> {
        return await this.genreService.all();
    }
}
