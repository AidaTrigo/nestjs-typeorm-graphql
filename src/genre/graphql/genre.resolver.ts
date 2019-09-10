import { Resolver, Query, ResolveProperty, Parent, Args, Mutation } from '@nestjs/graphql';
import { GenreService } from '../services/genre.service';
import { Genre } from 'src/graphql';
import { GenreDto } from '../dto/genre.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth-guard';

@Resolver('Genre')
export class GenreResolver {
    constructor(
        private readonly genreService: GenreService,
    ) {}

    @Query()
    @UseGuards(GqlAuthGuard)
    async genre(@Args('id') id: number): Promise<Genre> {
        return await this.genreService.one(id);
    }

    @Query()
    @UseGuards(GqlAuthGuard)
    async genres(): Promise<Genre[]> {
        return await this.genreService.all();
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    async newGenre(@Args('genre') genre: GenreDto): Promise<Genre> {
        return await this.genreService.create(genre);
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    async updateGenre(@Args('id') id: number, @Args('genre') genre: GenreDto): Promise<Genre> {
        return await this.genreService.update(id, genre);
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    async deleteGenre(@Args('id') id: number): Promise<Genre> {
        return await this.genreService.delete(id);
    }
}
