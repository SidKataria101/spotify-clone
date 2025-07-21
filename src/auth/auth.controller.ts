import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/user-dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-dto';
import { EnableTwoFAType } from './types';
import { JwtGuard } from './jwt-guard';
import { VerifyTokenDTO } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService, 
        private authService: AuthService
    ) {}

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) : Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) : Promise<{accessToken: string} | {validate2FA: string, message: string}> {
        return this.authService.login(loginUserDto);
    }

    @Get('enable-two-fa')
    @UseGuards(JwtGuard)
    enableTwoFA(@Req() req) : Promise<EnableTwoFAType> {
        console.log(req.user, 'req.user');
        return this.authService.enableTwoFA(req.user.userId);
    }

    @Post('verify-two-fa')
    @UseGuards(JwtGuard)
    verifyTwoFA(
        @Body() verifyTokenDTO: VerifyTokenDTO,
        @Req() req
    ) : Promise<{verified: boolean}> {
        console.log(req.user, 'req.user');
        return this.authService.validate2FAtoken(
            req.user.userId, 
            verifyTokenDTO.token
        );
    }

    @Post('disable-two-fa')
    @UseGuards(JwtGuard)
    disableTwoFA(@Req() req) : Promise<void> {
        return this.authService.disableTwoFA(req.user.userId);
    }
}
