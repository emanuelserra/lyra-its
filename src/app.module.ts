import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorsModule } from './professors/professors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true, // così non serve mettere ogni entity a mano
      synchronize: true,      // solo in dev
    }),
    UsersModule, // importa il modulo users
    ProfessorsModule, // importa il modulo dei professori
  ],
})
export class AppModule {}

