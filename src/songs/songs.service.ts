import { DefaultValuePipe, HttpException, HttpStatus, Injectable, ParseIntPipe, Query } from '@nestjs/common';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongsDTO } from './songs-dto/create-song-dto';
import { UpdateSongsDTO } from './songs-dto/update-songs-dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {

    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>
    ) {}
    //local storage - array of songs
    private readonly songs: any[] = [];

    //save a song to the local storage
    async create(songDTO: CreateSongsDTO) : Promise<Song> {

        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.album = songDTO.album;
        song.releaseDate = songDTO.releaseDate;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        return this.songRepository.save(song);

    }

    //get all songs from the local storage
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ) : Promise<Pagination<Song>> {
        try {
            return paginate<Song>(this.songRepository, {
                page,
                limit
            });
        } catch(e){
            console.log('Caught error', e)
            throw new HttpException('Error fetching songs', 
                HttpStatus.NOT_FOUND, 
                {
                    cause: e
                })
        }
    }

    async findOne(id: number): Promise<Song> {
        try {
            const song = await this.songRepository.findOneBy({ id });
            if (!song) {
                throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
            }
            return song;
        } catch (e) {
            console.log('Caught error', e);
            throw new HttpException('Error fetching song',
                HttpStatus.NOT_FOUND,
                {
                    cause: e
                });
        }
    }

    async remove(id: number) : Promise<void> {
        try {
            await this.songRepository.delete(id);
        } catch(e){
            console.log('Caught error', e);
            throw new HttpException('Error deleting song', 
                HttpStatus.NOT_FOUND, 
                {
                    cause: e
                });
        }
    }

    async update(id: number, songDTO: UpdateSongsDTO) : Promise<UpdateResult> {
        try {
            const song = await this.songRepository.findOneBy({ id });
            if (!song) {
                throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
            }
            song.title = songDTO.title;
            song.artists = songDTO.artists;
            song.album = songDTO.album;
            song.releaseDate = songDTO.releaseDate;
            song.duration = songDTO.duration;
            song.lyrics = songDTO.lyrics;
            return this.songRepository.update(id, song);
        } catch(e){
            console.log('Caught error', e);
            throw new HttpException('Error updating song', 
                HttpStatus.NOT_FOUND, 
                {
                    cause: e
                });
        }
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        console.log('Pagination options', options);

        const queryBuilder = this.songRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releaseDate', 'DESC');
        
        return paginate<Song>(queryBuilder, options);
    }
}
