import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { CreatePlaylistDTO } from "./create-playlist-dto/create-playlist-dto";
import { Playlist } from "./playlist.entity";
import { DeleteResult } from "typeorm";


@Controller('playlist')
export class PlaylistController {
    constructor(private playlistService: PlaylistService) {}

    @Post()
    create(@Body() createPlaylistDTO: CreatePlaylistDTO): Promise<Playlist> {
        return this.playlistService.create(createPlaylistDTO);
    }

    @Get()
    findAll(): Promise<Playlist[]> {
        return this.playlistService.findAll();
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.playlistService.delete(id);
    }
}