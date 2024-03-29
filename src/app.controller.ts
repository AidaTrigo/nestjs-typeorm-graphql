import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('api')
export class AppController {

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refreshToken')
  async refreshToken(@Body() body) {
    return this.authService.refreshToken(body.refresh_token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
