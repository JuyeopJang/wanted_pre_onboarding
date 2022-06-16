import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async save(user) {
    return this.usersRepository.save(user);
  }

  async findUserById(userId: string) {
    return this.usersRepository
      .createQueryBuilder()
      .where('user.id = :userId', { userId })
      .getOne();
  }
}
