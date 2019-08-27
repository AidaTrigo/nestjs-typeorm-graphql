import { Resolver, Query, ResolveProperty, Parent, Args, Mutation } from '@nestjs/graphql';
import { GenreService } from '../services/genre.service';
import { Genre } from 'src/graphql';
import { GenreDto } from '../dto/genre.dto';

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

    @Mutation()
    async newGenre(@Args('genre') genre: GenreDto): Promise<Genre> {
        return await this.genreService.create(genre);
    }

    @Mutation()
    async updateGenre(@Args('id') id: number, @Args('genre') genre: GenreDto): Promise<Genre> {
        return await this.genreService.update(id, genre);
    }

    @Mutation()
    async deleteGenre(@Args('id') id: number): Promise<Genre> {
        return await this.genreService.delete(id);
    }
}
