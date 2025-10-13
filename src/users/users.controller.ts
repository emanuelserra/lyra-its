import { Body, Controller, Post } from "@nestjs/common";
import { User } from "./users.entity";
import { UserService } from "./users.service";
  
@Controller('users')
export class UserController{
    constructor(private userService: UserService){}

    @Post('create')
    crateUser(@Body() firstName: string, lastName: string, email: string, password_hash: string, birth_date: Date,  phone: string, role: string){
    const user=this.userService.createUser(firstName, lastName, email, password_hash, birth_date,  phone, role);
    return user;
}
}