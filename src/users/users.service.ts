import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

// This should be a real class/interface representing a user entity
export type user = any;

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userService: Repository<User>){}
  

  async findOne(email: string, password: string): Promise<user | undefined> {
    const user = await this.userService.createQueryBuilder('users')
    .where(":email = email", {email})
    .andWhere(':password = password', {password} )
    .getRawOne();
    return user;
  }
}