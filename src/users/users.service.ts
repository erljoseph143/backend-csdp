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
    .select('id, first_name, last_name, email, password')
    .addSelect(`CASE 
                  WHEN account_type = 1 then 'admin' 
                  WHEN account_type = 2 then 'staff' 
                  ELSE 'guest' 
                END`, 'user_type')
    .addSelect('account_type', 'account_type')
    .where(":email = email", {email})
    .getRawOne();
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