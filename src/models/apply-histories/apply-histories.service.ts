import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JobsRepository } from '../jobs/jobs.repository';
import { UsersRepository } from '../users/users.repository';
import { ApplyHistoriesRepository } from './apply-histories.repository';
import { ApplyJobDto } from './dtos/request-dto/apply-job.dto';
import { ApplyHistory } from './entities/apply-history.entity';

@Injectable()
export class ApplyHistoriesService {
  constructor(
    private readonly applyHistoriesRepository: ApplyHistoriesRepository,
    private readonly jobsRepository: JobsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async applyJob(applyJobDto: ApplyJobDto) {
    const { jobId, userId } = applyJobDto;

    const job = await this.jobsRepository.findJobById(jobId);

    if (!job) throw new NotFoundException('존재하지 않는 채용공고입니다.');

    const user = await this.usersRepository.findUserById(userId);

    if (!user) throw new NotFoundException('존재하지 않는 사용자입니다.');

    const prevHistory =
      await this.applyHistoriesRepository.findApplyHistoryByJobIdAndUserId(
        jobId,
        userId,
      );

    if (prevHistory) {
      throw new ForbiddenException('이미 지원한 채용공고입니다.');
    }

    const applyHistory = new ApplyHistory();

    applyHistory.setJob(job);
    applyHistory.setUser(user);

    try {
      const createdHistory = await this.applyHistoriesRepository.createHistory(
        applyHistory,
      );

      return { historyId: createdHistory.identifiers[0].id };
    } catch (err) {
      throw new InternalServerErrorException(
        '서버 문제로 채용공고 지원에 실패했습니다.',
      );
    }
  }
}
