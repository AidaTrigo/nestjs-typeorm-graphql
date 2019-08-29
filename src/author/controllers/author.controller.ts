import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthorDto } from '../dto/author.dto';
import { AuthorService } from '../services/author.service';
import { ApiUseTags, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiUseTags('library')
@Controller('author')
export class AuthorController {
    constructor(
        private authorService: AuthorService,
    ) {}

    @Get()
    all() {
        return this.authorService.all();
    }

    @Get(':id')
    one(@Param('id') id: number) {
        return this.authorService.one(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({description: 'The record has been successfully created.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    create(@Body() author: AuthorDto) {
        return this.authorService.create(author);
    }

    @Put(':id')
    @ApiNotFoundResponse({description: 'ID not found.'})
    @ApiForbiddenResponse({description: 'Forbidden.'})
    update(@Param('id') id: number, @Body() author: AuthorDto) {
        return this.authorService.update(id, author);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.authorService.delete(id);
    }
}
