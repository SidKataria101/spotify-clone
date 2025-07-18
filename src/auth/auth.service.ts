import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(loginUserDto: LoginUserDto) : Promise<{accessToken: string}> {
        const user = await this.userService.findByEmail(loginUserDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid Email');
        }
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid Password');
        }
        const payload = { email: user.email, sub: user.userId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

}
