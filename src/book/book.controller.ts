import { Controller, Get, Res, Post, Body, Put, Param, Delete, HttpStatus, UsePipes, HttpCode } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { BookService } from './services/book.service';

@Controller('book')
export class BookController {
    constructor(
        private bookService: BookService,
    ) {}

    @Get()
    all() {
        return this.bookService.all();
    }

    @Get(':id')
    one(@Param('id') id: number) {
        return this.bookService.one(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() book: BookDto) {
        return this.bookService.create(book);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() book: BookDto) {
        return this.bookService.update(id, book);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.bookService.delete(id);
    }
}
