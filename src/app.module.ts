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


const devConfig = {port: 3000};
const prodConfig = {port: 400};

@Module({
  imports: [SongsModule, TypeOrmModule.forRoot(
    {
      database: 'spotify-clone',
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'sql123',
      synchronize: true,
      entities: [Song, User, Artist],
    })],
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