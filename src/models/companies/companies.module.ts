import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesRepository } from './companies.repository';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService, CompaniesRepository],
  controllers: [CompaniesController],
  exports: [CompaniesRepository],
})
export class CompaniesModule {}
