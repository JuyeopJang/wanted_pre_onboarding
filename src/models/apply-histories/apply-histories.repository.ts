import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyHistory } from './entities/apply-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplyHistoriesRepository {
  constructor(
    @InjectRepository(ApplyHistory)
    private readonly applyHistoriesRepository: Repository<ApplyHistory>,
  ) {}

  async createHistory(applyHistory: ApplyHistory) {
    return this.applyHistoriesRepository
      .createQueryBuilder()
      .insert()
      .into(ApplyHistory)
      .values(applyHistory)
      .execute();
  }
}
