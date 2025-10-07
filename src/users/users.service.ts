import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  async findOne(id: number): Promise<User> {
    return { id, email: 'fake@temp.test' } as User;
  }
}
