import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";
import { Artist } from "src/artist/artist.entity";
import { Playlist } from "src/playlist/playlist.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    @IsString()
    @IsNotEmpty()
    title: string;

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

    @ManyToMany(() => Artist, (artist) => artist.songs, {cascade: true})
    @JoinTable({name: 'song_artist'})
    artists: Artist[];

    @ManyToOne(() => Playlist, (playlist) => playlist.songs)
    playlist: Playlist;
}




