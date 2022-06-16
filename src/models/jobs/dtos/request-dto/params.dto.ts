import { IsString } from 'class-validator';

export class JobIdParam {
  @IsString()
  jobId: string;
}
