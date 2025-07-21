import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from "./artist.entity";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { UserModule } from "src/user/user.module";


@Module({
    imports: [TypeOrmModule.forFeature([Artist]), UserModule],
    controllers: [ArtistController],
    providers: [ArtistService],
    exports: [ArtistService],
})
export class ArtistModule {}