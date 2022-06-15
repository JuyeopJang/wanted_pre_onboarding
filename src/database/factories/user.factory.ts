import { faker } from '@faker-js/faker';
import { User } from 'src/models/users/entities/user.entity';

export const mockUser = () => {
  const user = new User();

  user.email = faker.internet.email();
  user.name = faker.internet.userName();
  user.password = faker.internet.password();
  user.nickname = faker.datatype.uuid();

  return user;
};
