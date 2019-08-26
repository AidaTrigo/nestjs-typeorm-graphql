
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
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

export interface IQuery {
    author(id: number): Author | Promise<Author>;
    authors(): Author[] | Promise<Author[]>;
    book(id: number): Book | Promise<Book>;
    books(): Book[] | Promise<Book[]>;
    genre(id: number): Genre | Promise<Genre>;
    genres(): Genre[] | Promise<Genre[]>;
}
