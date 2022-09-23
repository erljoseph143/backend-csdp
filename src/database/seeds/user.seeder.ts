import { Seeder, SeederFactoryManager, SeederOptions } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/users.entity';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(User);
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash('123456', salt);
        await repository.insert([
            {
                first_name: 'RJ',
                last_name: 'Baay',
                email: 'rj.baay@test.com',
                password: passwordHash
            }
        ]);

        // ---------------------------------------------------

        const userFactory = await factoryManager.get(User);
        // save 1 factory generated entity, to the database
        // await userFactory.save();

        // save 5 factory generated entities, to the database
        await userFactory.saveMany(5);
    }
}