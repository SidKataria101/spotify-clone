import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { MiddlewareMiddleware } from './common/middleware/middleware.middleware';
import { DevConfigService } from './providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { typeOrmAsyncConfig } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configurations from './config/configurations';
import { validate } from '../env.validation';

const devConfig = {port: 3000};
const prodConfig = {port: 400};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      load: [configurations],
      validate: validate,
    }),
    SongsModule, 
    PlaylistModule, 
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig), 
    AuthModule, 
    UserModule, 
    ArtistModule, 
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService, DevConfigService,
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
      },
    }
  ],
})
export class AppModule implements NestModule{
  constructor(private dataSource: DataSource) {
    console.log('Connected to db : ',this.dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareMiddleware)
    .forRoutes('songs');
  }
}