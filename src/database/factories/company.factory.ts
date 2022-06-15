import { faker } from '@faker-js/faker';
import { Company } from 'src/models/companies/entities/company.entity';

export const mockCompany = () => {
  const company = new Company();

  company.name = faker.company.companyName();
  company.country = '한국';
  company.region = '서울';

  return company;
};
