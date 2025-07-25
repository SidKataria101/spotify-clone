import { Playlist } from 'src/playlist/playlist.entity';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, IsNull } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(() => Playlist, (playlist) => playlist.user)
    playlists: Playlist[];

    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;

    @Column({ default: false, type: 'boolean' })
    isTwoFAEnabled: boolean;

    @Column({ nullable: true, type: 'text' })
    apiKey: string;

    @Column({ nullable: true, type: 'text' })
    phone: string;

    @Column({ nullable: true, type: 'text' })
    address: string;

    @Column({ nullable: true, type: 'text' })
    city: string;

}