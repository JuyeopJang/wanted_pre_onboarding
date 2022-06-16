import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Response } from 'src/common/response/response-format';
import { ApplyHistoriesService } from './apply-histories.service';
import { ApplyJobDto } from './dtos/request-dto/apply-job.dto';

@Controller('apply-histories')
export class ApplyHistoriesController {
  constructor(private readonly applyHistoriesService: ApplyHistoriesService) {}

  @HttpCode(201)
  @Post()
  async applyJob(@Body() applyJobDto: ApplyJobDto) {
    await this.applyHistoriesService.applyJob(applyJobDto);
    return new Response(201, '채용 공고에 성공적으로 지원 되었습니다.', {});
  }
}
