import { Injectable, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import jwt_decode  from 'jwt-decode';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
        super();
    }

    public async canActivate(context: ExecutionContext) : Promise<any> {
        
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      let jwtAuth = request.headers.authorization ? request.headers.authorization.split(/\s/) : '';
      jwtAuth = jwtAuth ? jwtAuth[1] : '';
      if (jwtAuth) {
        const user: any = jwt_decode(jwtAuth);
        await super.canActivate(context);
        if(!roles.includes(user.user_type)){
          throw new ForbiddenException();
        }
        return super.canActivate(context);
      }

      throw new UnauthorizedException();

    }
}