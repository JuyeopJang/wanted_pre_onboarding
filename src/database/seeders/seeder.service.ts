import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from 'src/models/companies/companies.repository';
import { UsersRepository } from 'src/models/users/users.repository';
import { mockUser } from '../factories/user.factory';
import { mockCompany } from '../factories/company.factory';

@Injectable()
export class SeederService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly companiesRepository: CompaniesRepository,
  ) {}

  async seed() {
    await Promise.all([
      this.usersRepository.save(mockUser()),
      this.usersRepository.save(mockUser()),
      this.usersRepository.save(mockUser()),
      this.usersRepository.save(mockUser()),
      this.usersRepository.save(mockUser()),
      this.usersRepository.save(mockUser()),
      this.usersRepository.save(mockUser()),
      this.usersRepository.save(mockUser()),
      this.usersRepository.save(mockUser()),
      this.usersRepository.save(mockUser()),
      this.companiesRepository.save(mockCompany()),
      this.companiesRepository.save(mockCompany()),
      this.companiesRepository.save(mockCompany()),
    ]);
  }
}
