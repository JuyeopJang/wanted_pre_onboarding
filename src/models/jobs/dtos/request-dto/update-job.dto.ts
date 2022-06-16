import { PartialType } from '@nestjs/mapped-types';
import { PostJobDto } from './post-job.dto';

export class UpdateJobDto extends PartialType(PostJobDto) {}
