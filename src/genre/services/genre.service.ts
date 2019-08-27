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

    async create(genre: GenreDto): Promise<GenreDto> {
        const savedGenre =  await this.genreRepository.save(genre);
        return await this.genreRepository.findOne(savedGenre.id);
    }

    async update(id: number, genre: GenreDto): Promise<GenreDto> {
        await this.genreRepository.update(id, genre);
        return await this.genreRepository.findOne(id);
    }

    async delete(id: number): Promise<GenreDto> {
        const genre = await this.genreRepository.findOne(id);
        await this.genreRepository.delete(id);

        return genre;
    }
}
