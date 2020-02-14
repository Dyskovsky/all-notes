import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './common/jwt.strategy';
import { ClientConfigModule } from './client-onfig/client-config.module';

@Module({
  imports: [
    PassportModule,
    NotesModule,
    ClientConfigModule,
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, process.env.STATIC_CONTENT_DIRECTORY, 'dist/fe-all-notes'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
