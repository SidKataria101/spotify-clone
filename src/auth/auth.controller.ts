import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/user-dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-dto';

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
    login(@Body() loginUserDto: LoginUserDto) : Promise<{accessToken: string}> {
        return this.authService.login(loginUserDto);
    }
}
