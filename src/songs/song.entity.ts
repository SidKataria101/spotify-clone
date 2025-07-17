import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";
import { Playlist } from "src/playlist/playlist.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    @IsString()
    @IsNotEmpty()
    title: string;

    @Column('varchar', {array: true})
    @IsArray()
    @IsNotEmpty()
    artists: string[];

    @Column('varchar')
    @IsString()
    @IsNotEmpty()
    album: string;

    @Column('date')
    @IsDateString()
    @IsNotEmpty()
    releaseDate: Date;

    @Column('time')
    @IsMilitaryTime()
    @IsNotEmpty()
    duration: number;  

    @Column('text')
    lyrics: string;
}




