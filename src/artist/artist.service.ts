import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Artist } from "./artist.entity";
import { User } from "../user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private readonly artistRepository: Repository<Artist>,
        private readonly userService: UserService
    ) {}

    findArtist(userId: number) {
        return this.artistRepository.findOne({ 
            where: { user: { userId: userId } },
            relations: ['user']
        });
    }

    async createArtist(userId: number, artistName: string) {
        const user = await this.userService.findByEmail(userId.toString());
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        const existingArtist = await this.findArtist(userId);
        if (existingArtist) {
            throw new Error(`Artist already exists for user ${userId}`);
        }

        const artist = new Artist();
        artist.name = artistName;
        artist.user = user;

        return this.artistRepository.save(artist);
    }
}