import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JobListDto } from './dtos/request-dto/job-list.dto';
import { JobIdParam } from './dtos/request-dto/params.dto';
import { PostJobDto } from './dtos/request-dto/post-job.dto';
import { UpdateJobDto } from './dtos/request-dto/update-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // 채용공고 등록 API
  @HttpCode(201)
  @Post()
  async postJob(@Body() postJobDto: PostJobDto) {
    const jobId = await this.jobsService.postJob(postJobDto);

    return jobId;
  }

  // 채용공고 수정 API
  @Put(':jobId')
  async updateJob(
    @Param() params: JobIdParam,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    const { jobId } = params;
    const updatedJob = await this.jobsService.updateJob(jobId, updateJobDto);

    return updatedJob;
  }

  // 채용공고 삭제 API
  @Delete(':jobId')
  async deleteJob(@Param() params: JobIdParam) {
    const { jobId } = params;

    await this.jobsService.deleteJob(jobId);
    return null;
  }

  // 채용공고 리스트 조회 API
  @Get()
  async showJobs(@Query() query: JobListDto) {
    const jobs = await this.jobsService.showJobs(query);

    return jobs;
  }

  // 채용공고 상세 페이지 조회 API
  @Get(':jobId')
  async showJob(@Param() params: JobIdParam) {
    const { jobId } = params;
    const job = await this.jobsService.findJob(jobId);

    return job;
  }
}
