import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pg_db',
      port: 5432,
      database: 'mks_movies_db',
      username: 'mksUser',
      password: 'MksPass123',
      synchronize: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
