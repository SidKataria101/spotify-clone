import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { MiddlewareMiddleware } from './common/middleware/middleware.middleware';
import { DevConfigService } from './providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { User } from './user/user.entity';
import { Artist } from './artist/artist.entity';
import { Playlist } from './playlist/playlist.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

const devConfig = {port: 3000};
const prodConfig = {port: 400};

@Module({
  imports: [SongsModule, PlaylistModule, 
    TypeOrmModule.forRoot(
    {
      database: 'spotify-clone',
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'sql123',
      synchronize: true,
      entities: [Song, User, Artist, Playlist],
    }), 
    AuthModule, UserModule, ArtistModule
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