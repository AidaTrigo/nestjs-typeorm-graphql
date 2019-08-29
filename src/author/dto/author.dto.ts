import { IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
export class AuthorDto {
    @ApiModelPropertyOptional()
    id: number;

    @ApiModelProperty()
    @IsString() name: string;
}
