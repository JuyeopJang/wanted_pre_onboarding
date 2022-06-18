import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApplyHistoriesService } from './apply-histories.service';
import { ApplyJobDto } from './dtos/request-dto/apply-job.dto';

@Controller('apply-histories')
export class ApplyHistoriesController {
  constructor(private readonly applyHistoriesService: ApplyHistoriesService) {}

  @HttpCode(201)
  @Post()
  async applyJob(@Body() applyJobDto: ApplyJobDto) {
    const historyId = await this.applyHistoriesService.applyJob(applyJobDto);

    return historyId;
  }
}
