import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { PostJobDto } from './dtos/post-job.dto';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
  ) {}

  async createJob(job: Job) {
    return this.jobsRepository
      .createQueryBuilder()
      .insert()
      .into(Job)
      .values(job)
      .execute();
  }

  async findJobById(jobId: string) {
    return this.jobsRepository
      .createQueryBuilder()
      .where('job.id = :jobId', { jobId })
      .getOne();
  }

  async deleteJobById(jobId: string) {
    return this.jobsRepository
      .createQueryBuilder()
      .delete()
      .from(Job)
      .where('id = :jobId', { jobId })
      .execute();
  }

  async updateJobById(jobId: string, job: Job) {
    return this.jobsRepository
      .createQueryBuilder()
      .update(Job)
      .set(job)
      .where('id = :jobId', { jobId })
      .execute();
  }

  async searchJobs(keyword: string) {
    return this.jobsRepository
      .createQueryBuilder()
      .select()
      .where(`MATCH(position) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(tech) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(description) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
      .getMany();
  }
}
