
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface AuthorInput {
    id?: number;
    name: string;
}

export interface BookInput {
    id?: number;
    name: string;
    author?: AuthorInput;
    genres?: GenreInput[];
}

export interface GenreInput {
    id?: number;
    name: string;
}

export interface Author {
    id: number;
    name: string;
    books?: Book[];
}

export interface Book {
    id: number;
    name: string;
    author?: Author;
    genres?: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface IMutation {
    newAuthor(author?: AuthorInput): Author | Promise<Author>;
    updateAuthor(id: number, author?: AuthorInput): Author | Promise<Author>;
    deleteAuthor(id: number): Author | Promise<Author>;
    newBook(book?: BookInput): Book | Promise<Book>;
    updateBook(id: number, book?: BookInput): Book | Promise<Book>;
    deleteBook(id: number): Book | Promise<Book>;
    newGenre(genre?: GenreInput): Genre | Promise<Genre>;
    updateGenre(id: number, genre?: GenreInput): Genre | Promise<Genre>;
    deleteGenre(id: number): Genre | Promise<Genre>;
}

export interface IQuery {
    author(id: number): Author | Promise<Author>;
    authors(): Author[] | Promise<Author[]>;
    book(id: number): Book | Promise<Book>;
    books(): Book[] | Promise<Book[]>;
    genre(id: number): Genre | Promise<Genre>;
    genres(): Genre[] | Promise<Genre[]>;
}
