import { Controller, Get, Post, Put, Delete, Body, HttpException, HttpStatus, Param, ParseIntPipe, Inject, Query, DefaultValuePipe, UseGuards, Req } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongsDTO } from './songs-dto/create-song-dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongsDTO } from './songs-dto/update-songs-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artist-jwt-guard';

@Controller('song')
export class SongsController {
    constructor(
        @InjectRepository(Song) 
        private songsRepository: Repository<Song>,
        private songsService: SongsService
    ) {}

    @Get()
    findAll(@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Song>> {
        try{
            return this.songsService.paginate({
                page,
                limit
            });
        } catch(e){
            console.log('Caught error', e)
            throw new HttpException('Error fetching songs', 
                HttpStatus.NOT_IMPLEMENTED, 
                {
                    cause: e
                })
        }
    }

    @Get(':id')
    findOne(@Param('id', 
        new ParseIntPipe(
            { 
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE 
            }
        )
    ) id: number): Promise<Song> {
        return this.songsRepository.findOneBy({ id }).then(song => {
            if (!song) {
                throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
            }
            return song;
        });
    }

    @Post()
    @UseGuards(ArtistJwtGuard)
    create(
        @Body() createSongsDTO: CreateSongsDTO,
        @Req() req
    ) {
        console.log(req.user);
        return this.songsService.create(createSongsDTO);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() songDTO: UpdateSongsDTO): Promise<UpdateResult> {
        return this.songsService.update(id, songDTO);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songsRepository.delete(id);
    }
}
