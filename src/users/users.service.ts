import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entity/users.entity';
import * as bcrypt from 'bcrypt'

// This should be a real class/interface representing a user entity
export type user = any;

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userService: Repository<User>){}
  

  async findOne(email: string, password: string): Promise<user | undefined> {

    const user = await this.userService.createQueryBuilder('users')
    .where(":email = email", {email})
    .getOne();
    const bcryptCompare = user ? await bcrypt.compare(password, user.password) : false;
    if (user && bcryptCompare) {
      return user;
    }
    return null;
  }

  async signupUser(users: any): Promise<void> {

    const user = new User();
    user.first_name = users.first_name;
    user.last_name = users.last_name;
    user.password = users.password;
    user.email = users.email;

    await this.userService.save(user)

  }
}