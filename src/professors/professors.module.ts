import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { Professor } from './entities/professor.entity';
import { UsersModule } from '../users/users.module'; // perché ogni professor è legato a un utente

@Module({
  imports: [
    TypeOrmModule.forFeature([Professor]), // collega l'entity Professor al repository
    UsersModule,     // per poter usare UsersService dentro ProfessorsService/Controller
  ],
  controllers: [ProfessorsController],   // espone le rotte /professors
  providers: [ProfessorsService],        // contiene la logica CRUD
  exports: [ProfessorsService],          // opzionale: se vuoi usare ProfessorsService altrove
})
export class ProfessorsModule {}

