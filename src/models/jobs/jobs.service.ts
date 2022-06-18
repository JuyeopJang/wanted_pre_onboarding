import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CompaniesRepository } from '../companies/companies.repository';
import { JobListDto } from './dtos/request-dto/job-list.dto';
import { PostJobDto } from './dtos/request-dto/post-job.dto';
import { UpdateJobDto } from './dtos/request-dto/update-job.dto';
import { Job } from './entities/job.entity';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {
  constructor(
    private readonly jobsRepository: JobsRepository,
    private readonly companiesRepository: CompaniesRepository,
  ) {}

  async postJob(postJobDto: PostJobDto) {
    const { companyId, title, position, reward, tech, description } =
      postJobDto;
    const company = await this.companiesRepository.findCompanyById(companyId);

    if (!company) throw new NotFoundException('존재하지 않는 회사입니다.');

    const job = new Job(title, position, reward, tech, description);
    job.setCompany(company);

    const createdJob = await this.jobsRepository.createJob(job);

    return { jobId: createdJob.identifiers[0].id };
  }

  async deleteJob(jobId: string) {
    const job = await this.jobsRepository.findJobById(jobId);

    if (!job) throw new NotFoundException('존재하지 않는 채용공고입니다.');

    try {
      await this.jobsRepository.deleteJobById(jobId);
    } catch (err) {
      throw new InternalServerErrorException(
        '서버 오류로 채용공고 삭제에 실패했습니다.',
      );
    }
  }

  async findJob(jobId: string) {
    const job = await this.jobsRepository.findJobById(jobId);

    if (!job) throw new NotFoundException('존재하지 않는 채용공고입니다.');

    return job;
  }

  async updateJob(jobId: string, updateJobDto: UpdateJobDto) {
    const job = await this.findJob(jobId);
    const { title, position, reward, tech, description } = updateJobDto;

    if (title) job.title = title;
    if (position) job.position = position;
    if (reward) job.reward = reward;
    if (tech) job.tech = tech;
    if (description) job.description = description;

    await this.jobsRepository.updateJobById(jobId, job);

    return {
      updatedTitle: job.title,
      updatedPosition: job.position,
      updatedReward: job.reward,
      updatedTech: job.tech,
      updatedDescription: job.description,
    };
  }

  async showJobs(query: JobListDto) {
    const { limit, keyword, offset } = query;
    const jobs = await this.jobsRepository.getJobsUsingQuery(
      keyword,
      limit,
      offset,
    );

    if (!jobs.length) return null;
    return jobs;
  }
}
