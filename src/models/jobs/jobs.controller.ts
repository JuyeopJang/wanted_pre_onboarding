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
import { Response } from 'src/common/response/response-format';
import { JobIdParam } from './dtos/request-dto/params.dto';
import { PostJobDto } from './dtos/request-dto/post-job.dto';
import { SearchQueryDto } from './dtos/request-dto/search-query.dto';
import { UpdateJobDto } from './dtos/request-dto/update-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // 채용공고 등록 API
  @HttpCode(201)
  @Post()
  async postJob(@Body() postJobDto: PostJobDto): Promise<Response> {
    const jobId = await this.jobsService.postJob(postJobDto);

    return new Response(201, '채용공고가 성공적으로 작성 되었습니다.', {
      jobId,
    });
  }

  // 채용공고 수정 API
  @Put(':jobId')
  async updateJob(
    @Param() params: JobIdParam,
    @Body() updateJobDto: UpdateJobDto,
  ) {
    const { jobId } = params;
    const updatedJob = await this.jobsService.updateJob(jobId, updateJobDto);

    return new Response(
      200,
      '채용공고가 성공적으로 수정 되었습니다.',
      updatedJob,
    );
  }

  // 채용공고 삭제 API
  @Delete(':jobId')
  async deleteJob(@Param() params: JobIdParam) {
    const { jobId } = params;

    await this.jobsService.deleteJob(jobId);

    return new Response(200, '채용공고가 성공적으로 삭제 되었습니다.', {});
  }

  // 채용공고 리스트 조회 API
  @Get()
  async showJobs() {
    return 'joblist!';
  }

  // 채용공고 검색 조회 API
  @Get('search')
  async searchJobs(@Query() query: SearchQueryDto) {
    const { keyword } = query;
    const jobs = await this.jobsService.searchJobs(keyword);

    return new Response(200, '채용공고가 성공적으로 검색 되었습니다.', jobs);
  }

  // 채용공고 상세 페이지 조회 API
  @Get(':jobId')
  async showJob(@Param() params: JobIdParam) {
    const { jobId } = params;
    const job = await this.jobsService.findJob(jobId);

    return new Response(200, '채용공고가 성공적으로 조회 되었습니다.', job);
  }
}
