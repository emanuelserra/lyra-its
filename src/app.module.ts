import { Module } from '@nestjs/common';

import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { SubjectsModule } from './subjects/subjects.module';

dotenv.config();
@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    UserModule,
    LessonsModule,
    CoursesModule,
    SubjectsModule,
  ],
})
export class AppModule { }