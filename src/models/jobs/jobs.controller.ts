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
  Res,
} from '@nestjs/common';
import { PostJobDto } from './dtos/request-dto/post-job.dto';
// import { Job } from './entities/job.entity';
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
  async updateJob(@Param('jobId') jobId: string) {
    return jobId;
  }

  // 채용공고 삭제 API
  @Delete(':jobId')
  async deleteJob(@Param('jobId') jobId: string) {
    return jobId;
  }

  // 채용공고 리스트 조회 API
  @Get()
  async showJobs() {
    return 'joblist!';
  }

  @Get('search')
  async searchJobs(@Query('keyword') keyword: string) {
    return keyword;
  }

  // 채용공고 상세 페이지 조회 API
  @Get(':jobId')
  async showJob(@Param('jobId') jobId: string) {
    return jobId;
  }
}
