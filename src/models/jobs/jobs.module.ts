import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsRepository } from './jobs.repository';
import { Job } from './entities/job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobsService, JobsRepository],
  controllers: [JobsController],
  exports: [JobsRepository],
})
export class JobsModule {}
