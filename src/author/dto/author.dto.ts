import { IsString } from 'class-validator';
export class AuthorDto
{
    id: number;
    @IsString() name: string;
}
