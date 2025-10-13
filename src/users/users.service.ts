import {Repository} from 'typeorm';
import {User} from './users.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    createUser(firstName: string, lastName: string, email: string, password_hash: string, birth_date: Date,  phone: string, role: string){
        const user = this.userRepository.create()
        this.userRepository.save
        return user
    }
}