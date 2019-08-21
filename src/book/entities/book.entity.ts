import { Author } from '../../author/entities/author.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Genre } from '../../genre/entities/genre.entity';
import { BookDto } from '../dto/book.dto';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @Column()
    // authorId: number;

    @ManyToOne(type => Author, author => author.books, {
        eager: true,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    })
    author: Author;

    @ManyToMany(type => Genre, {
        eager: true,
    })
    @JoinTable()
    genres: Genre[];
}
