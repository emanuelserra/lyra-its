import {Repository} from 'typeorm';
import {User} from './users.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { METHODS } from 'http';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    createUser(firstName: string, lastName: string, email: string, password_hash: string, birth_date: Date,  phone: string, role: string){
        const user = this.userRepository.create();
        this.userRepository.save;
        return user;
    }
    findAllUsers(): Promise<User[]>{
        return this.userRepository.find();
    }
    async findUserById(id:number): Promise<User>{
         const user = await this.userRepository.findOne({where:{id}});
         if(!user){
            throw new NotFoundException('utente non trovato');
         }
        return user;
    }
    updateUser(id:number): Promise<User>{
        const user = this.userRepository.update;
        return this.findUserById(id);
    } 
    deleteUser(id:number){
        this.userRepository.delete;
    }
}