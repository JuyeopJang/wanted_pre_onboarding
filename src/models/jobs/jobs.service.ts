import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CompaniesRepository } from '../companies/companies.repository';
import { PostJobDto } from './dtos/request-dto/post-job.dto';
import { Job } from './entities/job.entity';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {
  constructor(
    private readonly jobsRepository: JobsRepository,
    private readonly companiesRepository: CompaniesRepository,
  ) {}

  async postJob(postJobDto: PostJobDto) {
    const { companyId, position, reward, tech, description } = postJobDto;
    const company = await this.companiesRepository.findCompanyById(companyId);

    if (!company) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '존재하지 않는 회사입니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const job = new Job(position, reward, tech, description);
    job.setCompany(company);

    const createdJob = await this.jobsRepository.createJob(job);

    return createdJob.identifiers[0].id;
  }
}
