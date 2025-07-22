import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToMany } from 'typeorm';
import { Song } from '../songs/song.entity';
import { User } from '../user/user.entity';

@Entity('artist')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Song, (song) => song.artists)
    songs: Song[];
}