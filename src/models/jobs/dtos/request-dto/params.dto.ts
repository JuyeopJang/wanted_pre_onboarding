import { IsNotEmpty, IsString } from 'class-validator';

export class JobIdParam {
  @IsNotEmpty()
  @IsString()
  jobId: string;
}
