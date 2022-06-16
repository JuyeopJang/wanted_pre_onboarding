import { Module } from '@nestjs/common';
import { ApplyHistoriesService } from './apply-histories.service';
import { ApplyHistoriesController } from './apply-histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyHistoriesRepository } from './apply-histories.repository';
import { ApplyHistory } from './entities/apply-history.entity';
import { UsersModule } from '../users/users.module';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApplyHistory]), UsersModule, JobsModule],
  providers: [ApplyHistoriesService, ApplyHistoriesRepository],
  controllers: [ApplyHistoriesController],
  exports: [ApplyHistoriesRepository],
})
export class ApplyHistoriesModule {}
