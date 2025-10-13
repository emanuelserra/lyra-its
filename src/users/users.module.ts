import { Module } from "@nestjs/common";
import { User } from "./users.entity";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule{}
