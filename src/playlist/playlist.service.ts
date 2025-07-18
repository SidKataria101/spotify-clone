import { Injectable } from "@nestjs/common";
import { Playlist } from "./playlist.entity";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Song } from "src/songs/song.entity";
import { CreatePlaylistDTO } from "./create-playlist-dto/create-playlist-dto";


@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepository: Repository<Playlist>,
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(User)
        private userRepository: Repository<User>) {}

    async create(playlistDTO: CreatePlaylistDTO) {
        const playList = new Playlist();

        playList.name = playlistDTO.name;
        playList.songs = await this.songRepository.find({ where: { id: In(playlistDTO.songIds) } });
        
        const user = await this.userRepository.findOne({ where: { userId: playlistDTO.user } });
        if (!user) {
            throw new Error(`User with id ${playlistDTO.user} not found`);
        }
        playList.user = user;

        return this.playlistRepository.save(playList);
    }

    async findAll() {
        return this.playlistRepository.find({relations: ['songs', 'user']});
    }

    async delete(id: number) {
        try{
            return this.playlistRepository.delete(id);
        } catch (error) {
            throw new Error(`Playlist with id ${id} not found`);
        }
    }

    async findOne(id: number) {
        return this.playlistRepository.findOne({ where: { id }, relations: ['songs', 'user'] });
    }
}   