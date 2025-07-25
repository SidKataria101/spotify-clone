import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { User } from 'src/user/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { Playlist } from 'src/playlist/playlist.entity';
import { Artist } from 'src/artist/artist.entity';
import { Song } from 'src/songs/song.entity';


export const seedData = async (manager: EntityManager): Promise<void> => {

    await seedUser();
    await seedArtist();
    await seedPlaylists();
    await seedSongs();

    async function seedUser() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = faker.string.uuid();
        user.phone = faker.phone.number();
        user.address = faker.location.streetAddress();
        user.city = faker.location.city();

        await manager.getRepository(User).save(user);
    }

    async function seedPlaylists() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = faker.string.uuid();
        user.phone = faker.phone.number();
        user.address = faker.location.streetAddress();
        user.city = faker.location.city();

        // Save user first
        const savedUser = await manager.getRepository(User).save(user);

        const playlist = new Playlist();
        playlist.name = faker.music.genre();
        playlist.songs = [];
        playlist.user = savedUser;

        await manager.getRepository(Playlist).save(playlist);
    }

    async function seedArtist() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = faker.string.uuid();
        user.phone = faker.phone.number();
        user.address = faker.location.streetAddress();
        user.city = faker.location.city();

        // Save user first
        const savedUser = await manager.getRepository(User).save(user);

        const artist = new Artist();
        artist.user = savedUser;
        artist.name = user.firstName + ' ' + user.lastName;

        await manager.getRepository(Artist).save(artist);
    }

    async function seedSongs() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = faker.string.uuid();
        user.phone = faker.phone.number();
        user.address = faker.location.streetAddress();
        user.city = faker.location.city();

        // Save user first
        const savedUser = await manager.getRepository(User).save(user);

        const artist = new Artist();
        artist.name = faker.music.artist();
        artist.user = savedUser;

        // Save artist first
        const savedArtist = await manager.getRepository(Artist).save(artist);

        const song = new Song();
        song.title = faker.music.songName();
        song.artists = [savedArtist];
        song.album = faker.music.album();
        
        // Convert duration from milliseconds to HH:MM:SS format
        const durationInSeconds = faker.number.int({ min: 180, max: 360 });
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
        song.duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        song.releaseDate = faker.date.past();
        song.lyrics = faker.word.words(70);

        await manager.getRepository(Song).save(song);
    }
}