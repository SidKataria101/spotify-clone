import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigrations1753313429507 implements MigrationInterface {
    name = 'MyMigrations1753313429507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userUserId" integer, CONSTRAINT "REL_621cc72ac56af11e8fc06ab072" UNIQUE ("userUserId"), CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "album" character varying NOT NULL, "releaseDate" date NOT NULL, "duration" TIME NOT NULL, "lyrics" text NOT NULL, "playlistId" integer, CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userUserId" integer, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "twoFASecret" text, "isTwoFAEnabled" boolean NOT NULL DEFAULT false, "apiKey" text, "phone" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "song_artist" ("songsId" integer NOT NULL, "artistId" integer NOT NULL, CONSTRAINT "PK_9eac7edb69d0a313a8d40fce51b" PRIMARY KEY ("songsId", "artistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9590707e02d58c3fe1fb4644c0" ON "song_artist" ("songsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_64e4cf898ff01303270abf23a0" ON "song_artist" ("artistId") `);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "FK_621cc72ac56af11e8fc06ab0728" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "songs" ADD CONSTRAINT "FK_46fc694bda96d0127f5a8ec3720" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_a9c9941222ada9c54d285202377" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song_artist" ADD CONSTRAINT "FK_9590707e02d58c3fe1fb4644c09" FOREIGN KEY ("songsId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "song_artist" ADD CONSTRAINT "FK_64e4cf898ff01303270abf23a0a" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_artist" DROP CONSTRAINT "FK_64e4cf898ff01303270abf23a0a"`);
        await queryRunner.query(`ALTER TABLE "song_artist" DROP CONSTRAINT "FK_9590707e02d58c3fe1fb4644c09"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_a9c9941222ada9c54d285202377"`);
        await queryRunner.query(`ALTER TABLE "songs" DROP CONSTRAINT "FK_46fc694bda96d0127f5a8ec3720"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "FK_621cc72ac56af11e8fc06ab0728"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64e4cf898ff01303270abf23a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9590707e02d58c3fe1fb4644c0"`);
        await queryRunner.query(`DROP TABLE "song_artist"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "songs"`);
        await queryRunner.query(`DROP TABLE "artist"`);
    }

}
