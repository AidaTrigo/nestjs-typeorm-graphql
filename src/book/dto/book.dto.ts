import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { AuthorDto } from '../../author/dto/author.dto';
import { GenreDto } from 'src/genre/dto/genre.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
export class BookDto {

    static manageable: string[] = ['id', 'name', 'author'];

    @ApiModelPropertyOptional()
    id: number;

    @ApiModelProperty()
    @IsString() name: string;

    @ApiModelProperty({type: AuthorDto})
    @IsNotEmpty() author: AuthorDto;

    @ApiModelProperty({type: [Object]})
    @IsArray() genres: GenreDto[];
}
