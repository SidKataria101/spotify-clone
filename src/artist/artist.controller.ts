import { Controller, Get, Post, Body, Param, ParseIntPipe } from "@nestjs/common";
import { ArtistService } from "./artist.service";

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post(':userId')
    async createArtist(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() body: { name: string }
    ) {
        return this.artistService.createArtist(userId, body.name);
    }
}