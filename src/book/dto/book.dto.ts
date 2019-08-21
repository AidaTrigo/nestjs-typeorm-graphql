import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { AuthorDto } from '../../author/dto/author.dto';
import { GenreDto } from 'src/genre/dto/genre.dto';
export class BookDto {

    static manageable: string[] = ['id', 'name', 'author'];

    id: number;
    @IsString() name: string;
    @IsNotEmpty() author: AuthorDto;
    @IsArray() genres: GenreDto[];
}
