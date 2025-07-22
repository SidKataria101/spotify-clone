import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ArtistModule } from '../artist/artist.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-stategy';
import { ApiKeyStrategy } from './api-key-strategy';

@Module({
  imports: [UserModule, ArtistModule, JwtModule.register({
    secret: process.env.JWT_SECRET, 
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
