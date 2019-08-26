import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Author } from './author/entities/author.entity';
import { AuthorController } from './author/controllers/author.controller';
import { AuthorService } from './author/services/author.service';
import { Book } from './book/entities/book.entity';
import { BookController } from './book/controllers/book.controller';
import { BookService } from './book/services/book.service';
import { GenreService } from './genre/services/genre.service';
import { GenreController } from './genre/controllers/genre.controller';
import { Genre } from './genre/entities/genre.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthorResolver } from './author/graphql/author.resolver';
import { BookResolver } from './book/graphql/book.resolver';
import { GenreResolver } from './genre/graphql/genre.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
        debug: true,
        playground: true,
        typePaths: ['./**/*.graphql'],
        definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
        },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql' as 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'library',
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: true,
    }),
    TypeOrmModule.forFeature([
      Author,
      Book,
      Genre,
    ]),
  ],
  controllers: [
    AppController,
    AuthorController,
    BookController,
    GenreController,
  ],
  providers: [
    AppService,
    AuthorService,
    BookService,
    GenreService,

    // resolvers
    AuthorResolver,
    BookResolver,
    GenreResolver,
  ],
})
export class AppModule {}
