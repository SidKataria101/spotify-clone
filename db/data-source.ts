import {DataSource, DataSourceOptions} from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'sql123',
    database: 'spotify-clone',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false,
}

export const dataSource = new DataSource(dataSourceOptions);