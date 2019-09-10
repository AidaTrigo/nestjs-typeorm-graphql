import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(
    private authService: AuthService,
  ) {
    super();
  }

  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      console.log('Token de acceso caducado.');
    }
    return user;
  }
}
