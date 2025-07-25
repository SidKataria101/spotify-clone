import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Req() req) {
    console.log(req.user, 'req.user', req.user.artistId, 'req.user.artistId');
    return req.user;
  }
}
