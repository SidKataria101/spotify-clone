import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { PayloadType } from './types';
 
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private artistService: ArtistService
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
        
        const payload: PayloadType = { email: user.email, userId: user.userId };

        const artist = await this.artistService.findArtist(user.userId);
        if (artist) {
            payload.artistId = artist.id;
        }
        console.log(payload);
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

}
