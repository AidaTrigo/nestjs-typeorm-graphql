import { Controller, Get, Res, Post, Body, Put, Param, Delete, HttpStatus, UsePipes, HttpCode, UseGuards } from '@nestjs/common';
import { GenreDto } from '../dto/genre.dto';
import { GenreService } from '../services/genre.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('library')
@Controller('genre')
export class GenreController {
    constructor(
        private genreService: GenreService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    all() {
        return this.genreService.all();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    one(@Param('id') id: number) {
        return this.genreService.one(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() genre: GenreDto) {
        return this.genreService.create(genre);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: number, @Body() genre: GenreDto) {
        return this.genreService.update(id, genre);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.genreService.delete(id);
    }
}
