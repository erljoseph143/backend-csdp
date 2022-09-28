import { Controller, Get, Request, Post, UseGuards, Headers } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import jwt_decode  from 'jwt-decode';
import { UsersService } from './users/users.service';
import { Request as Req } from 'express';
import { Roles } from './roles/roles.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('guest','admin')
  @Get('profile')
  getProfile(@Request() req, @Headers() head) {
    return jwt_decode(head.authorization.split(' ')[1]);
  }

  @Post('auth/signup')
  async createUser(@Request() req: Req){
    this.userService.signupUser(req.query)
  }
}