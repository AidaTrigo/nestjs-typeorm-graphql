import { IsString } from 'class-validator';

export class GenreDto {
    id: number;
    @IsString() name: string;
}
