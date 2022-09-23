import { DataSourceOptions, DataSource } from 'typeorm';
import MigrationsList from './migrations.list';
import { SeederOptions } from 'typeorm-extension';
import { User } from '../users/users.entity';
import * as dotenv from 'dotenv'
dotenv.config();

export const typeOrmConfig: DataSourceOptions & SeederOptions= {
    type: 'mysql',
    // autoLoadEntities: true,
    synchronize: false,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities:[User],
    migrations: [...MigrationsList],
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}']
}

export default new DataSource(typeOrmConfig);