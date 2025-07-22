import { Song } from 'src/songs/song.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Song, (song) => song.playlist)
    songs: Song[];

    @ManyToOne(() => User, (user) => user.playlists)
    user: User;
}