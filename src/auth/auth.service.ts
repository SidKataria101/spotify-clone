import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { EnableTwoFAType, PayloadType } from './types';
import * as speakeasy from 'speakeasy';
 
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private artistService: ArtistService
    ) {}

    async login(loginUserDto: LoginUserDto) : Promise<{accessToken: string} | {validate2FA: string, message: string}> {
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

        if (user.isTwoFAEnabled && user.twoFASecret) {
            return {
                validate2FA: 'http://localhost:3000/auth/verify-two-fa',
                message: '2FA is enabled, please verify your token'
            }
        }

        console.log(payload);
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async enableTwoFA(userId: number): Promise<EnableTwoFAType> {
        const user = await this.userService.findById(userId);
        if (user.isTwoFAEnabled) {
            return { secret: user.twoFASecret };
        }
        const secret = speakeasy.generateSecret();
        console.log(secret , 'secret');
        user.twoFASecret = secret.base32;
        await this.userService.updateTwoFASecret(userId, secret.base32);
        return { secret: user.twoFASecret };
    }

    async validate2FAtoken(userId: number, token: string) : Promise<{verified: boolean}> {
        const user = await this.userService.findById(userId);
        try {
            const verified = speakeasy.totp.verify({
            secret: user.twoFASecret,
            token: token,
            encoding: 'base32',
            });
            if (!verified) {
                console.log('Invalid Token');
                throw new UnauthorizedException('Invalid Token');
            } else {
                return { verified: true };
            }
        } catch (error) {
            console.log('Invalid Token, couldnt verify');
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async disableTwoFA(userId: number) : Promise<void> {
        await this.userService.disable2FA(userId);
    }

}
