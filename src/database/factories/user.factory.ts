import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entity/users.entity';

export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.first_name = faker.name.firstName('male');
    user.last_name = faker.name.lastName('male');
    user.email = faker.internet.email(user.first_name, user.last_name);
    user.password = '123456'

    return user;
})