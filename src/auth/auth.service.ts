import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload, {expiresIn: jwtConstants.authTokenLife}),
      refreshToken: this.jwtService.sign(payload, {expiresIn: jwtConstants.refreshTokenLife}),
    };
  }

  async refreshToken(refreshToken: any) {
    try {
      this.jwtService.verify(refreshToken);
      const oldToken = this.jwtService.decode(refreshToken);
      const payload = {
        // tslint:disable-next-line: no-string-literal
        username: oldToken['username'],
        // tslint:disable-next-line: no-string-literal
        sub: oldToken['sub'],
      };
      const tokenNew = this.jwtService.sign(payload, {expiresIn: jwtConstants.authTokenLife});
      const refreshTokenNew = this.jwtService.sign(payload, {expiresIn: jwtConstants.refreshTokenLife});
      return {
        accessToken: tokenNew,
        refreshToken: refreshTokenNew,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
