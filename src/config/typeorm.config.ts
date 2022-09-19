import { DataSourceOptions, DataSource } from 'typeorm';
import MigrationsList from './migrations.list';
import * as dotenv from 'dotenv'
dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
    type: 'mysql',
    // autoLoadEntities: true,
    synchronize: false,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: [...MigrationsList],
    // cli: {
    //     migrationsDir: __dirname + '../database/migrations'
    // }
}

export default new DataSource(typeOrmConfig);