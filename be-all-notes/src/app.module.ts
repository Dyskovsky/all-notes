import { join } from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

// TODO SSL connection do db

@Module({
  imports: [
    NotesModule,
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'dist/fe-all-notes'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
