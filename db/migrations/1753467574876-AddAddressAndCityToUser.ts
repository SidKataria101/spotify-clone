import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressAndCityToUser1753467574876 implements MigrationInterface {
    name = 'AddAddressAndCityToUser1753467574876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "address" text`);
        await queryRunner.query(`ALTER TABLE "user" ADD "city" text`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    }

}
