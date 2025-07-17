import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/user-dto';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService) {}

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) : Promise<User> {
        return this.userService.create(createUserDto);
    }
}
