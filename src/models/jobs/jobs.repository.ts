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
      .createQueryBuilder('j')
      .select([
        'j.id',
        'j.title',
        'j.position',
        'j.reward',
        'j.tech',
        'j.description',
        'c.id',
        'c.name',
        'c.country',
        'c.region',
      ])
      .innerJoin('j.company', 'c')
      .where('j.id = :jobId', { jobId })
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

  async getJobsUsingQuery(keyword: string, limit: number, offset: number) {
    const query = this.jobsRepository
      .createQueryBuilder('j')
      .select([
        'j.id',
        'j.title',
        'j.reward',
        'c.name',
        'c.region',
        'c.country',
      ])
      .innerJoin('j.company', 'c');

    if (keyword) {
      query
        .where(`MATCH(j.title) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
        .orWhere(`MATCH(j.position) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
        .orWhere(`MATCH(j.tech) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
        .orWhere(`MATCH(j.description) AGAINST ('${keyword}' IN BOOLEAN MODE)`);
    }

    return query.skip(offset).take(limit).getMany();
  }
}
