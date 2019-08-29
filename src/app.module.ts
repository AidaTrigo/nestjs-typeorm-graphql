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
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';

@Module({
  imports: [
    // MODULES
    ConfigModule,
    CustomLoggerModule,
    GraphQLModule.forRoot({
        debug: true,
        playground: true,
        typePaths: ['./**/*.graphql'],
        definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
        },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
          type: 'mysql' as 'mysql',
          host: config.get('DATABASE_HOST'),
          port: config.get('DATABASE_PORT') as unknown as number,
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD'),
          database: config.get('DATABASE_SCHEMA'),
          entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql' as 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'admin',
    //   password: 'admin',
    //   database: 'library',
    //   entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    //   // logging: true,
    // }),
    TypeOrmModule.forFeature([
      // ENTITIES
      Author,
      Book,
      Genre,
    ]),
  ],
  controllers: [
    // CONTROLLERS
    AppController,
    AuthorController,
    BookController,
    GenreController,
  ],
  providers: [
    // CONFIG MODULE
    ConfigModule,

    // SERVICES
    AppService,
    AuthorService,
    BookService,
    GenreService,

    // RESOLVERS
    AuthorResolver,
    BookResolver,
    GenreResolver,
  ],
})
export class AppModule {}
