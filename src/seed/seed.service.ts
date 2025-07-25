import { Injectable } from '@nestjs/common';
import { seedData } from 'db/seeds/data-seed';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedService {
    constructor(private readonly dataSource: DataSource) {}

    async seed(): Promise<void> {
        console.log('Seeding data...');
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try {
            const manager = queryRunner.manager;
            await seedData(manager);
            await queryRunner.commitTransaction();
        } catch (error) {
            console.error('Error seeding data:', error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
        console.log('Data seeded successfully');
    }
}
