import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './common/jwt.strategy';
@Module({
  imports: [
    PassportModule,
    NotesModule,
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'dist/fe-all-notes'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
