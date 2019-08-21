import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreDto } from '../dto/genre.dto';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private readonly genreRepository: Repository<GenreDto>,
    ) {}

    async all(): Promise<GenreDto[]> {
        return await this.genreRepository.find();
    }

    async one(id: number): Promise<GenreDto> {
        return await this.genreRepository.findOne(id);
    }

    async create(library: GenreDto): Promise<GenreDto> {
        return await this.genreRepository.save(library);
    }

    async update(id: number, library: GenreDto): Promise<GenreDto> {
        await this.genreRepository.update(id, library);
        return await this.genreRepository.findOne(id);
    }

    async delete(id: number): Promise<GenreDto> {
        const library = await this.genreRepository.findOne(id);
        await this.genreRepository.delete(id);

        return library;
    }
}
