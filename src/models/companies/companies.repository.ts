import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async save(company) {
    return this.companiesRepository.save(company);
  }

  async findCompanyById(companyId: string) {
    return this.companiesRepository
      .createQueryBuilder('company')
      .where('company.id = :companyId', { companyId })
      .getOne();
  }
}
