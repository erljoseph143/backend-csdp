import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from './users.entity';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {

  constructor(@InjectRepository(users) private userService: Repository<users>){}
  

  async findOne(email: string, password: string): Promise<User | undefined> {
    const user = await this.userService.createQueryBuilder()
    .where(":email = email", {email})
    .andWhere(':password = password', {password} )
    .getRawOne();
    return user;
  }
}