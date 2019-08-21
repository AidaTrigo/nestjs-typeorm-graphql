import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GenreDto } from '../dto/genre.dto';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;
}
