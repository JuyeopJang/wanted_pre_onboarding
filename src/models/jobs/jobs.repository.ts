import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostJobDto } from './dtos/post-job.dto';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
  ) {}

  async createJob(postJobDto: PostJobDto) {
    return this.jobsRepository
      .createQueryBuilder()
      .insert()
      .into(Job)
      .values(postJobDto)
      .execute();
  }
}