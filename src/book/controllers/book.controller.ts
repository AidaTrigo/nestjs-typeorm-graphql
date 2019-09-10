import { Controller, Get, Res, Post, Body, Put, Param, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { BookDto } from '../dto/book.dto';
import { BookService } from '../services/book.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';

@ApiUseTags('library')
@Controller('book')
export class BookController {
    constructor(
        private bookService: BookService,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    all() {
        return this.bookService.all();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    one(@Param('id') id: number) {
        return this.bookService.one(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() book: BookDto) {
        return this.bookService.create(book);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: number, @Body() book: BookDto) {
        return this.bookService.update(id, book);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.bookService.delete(id);
    }
}
