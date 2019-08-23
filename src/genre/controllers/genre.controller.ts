import { Controller, Get, Res, Post, Body, Put, Param, Delete, HttpStatus, UsePipes, HttpCode } from '@nestjs/common';
import { GenreDto } from '../dto/genre.dto';
import { GenreService } from '../services/genre.service';

@Controller('genre')
export class GenreController {
    constructor(
        private genreService: GenreService,
    ) {}

    @Get()
    all() {
        return this.genreService.all();
    }

    @Get(':id')
    one(@Param('id') id: number) {
        return this.genreService.one(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() genre: GenreDto) {
        return this.genreService.create(genre);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() genre: GenreDto) {
        return this.genreService.update(id, genre);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.genreService.delete(id);
    }
}
