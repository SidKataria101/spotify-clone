import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connections';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { CreateSongsDTO } from './songs-dto/create-song-dto';
import { UpdateSongsDTO } from './songs-dto/update-songs-dto';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), CreateSongsDTO, UpdateSongsDTO],
  controllers: [SongsController],
  providers: [
    {
      provide: SongsService,
      useClass: SongsService
    },
    {
      provide: 'CONNECTION',
      useValue: connection
    }
  ]
})
export class SongsModule {}
