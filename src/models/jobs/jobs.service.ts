import { Injectable } from '@nestjs/common';
import { PostJobDto } from './dtos/post-job.dto';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {
  constructor(private readonly jobsRepository: JobsRepository) {}

  async postJob(postJobDto: PostJobDto) {
    await this.jobsRepository.createJob(postJobDto);
  }
}
