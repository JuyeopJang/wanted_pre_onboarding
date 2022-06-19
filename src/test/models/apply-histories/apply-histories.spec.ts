import { Test } from '@nestjs/testing';
import { PostJobDto } from '../../../models/jobs/dtos/request-dto/post-job.dto';
import { faker } from '@faker-js/faker';
import { JobsRepository } from '../../../models/jobs/jobs.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Company } from '../../../models/companies/entities/company.entity';
import { Job } from '../../../models/jobs/entities/job.entity';
import { ApplyHistoriesService } from '../../../models/apply-histories/apply-histories.service';
import { UsersRepository } from '../../../models/users/users.repository';
import { ApplyHistoriesRepository } from '../../../models/apply-histories/apply-histories.repository';
import { User } from '../../../models/users/entities/user.entity';
import { ApplyHistory } from '../../../models/apply-histories/entities/apply-history.entity';
import { ApplyJobDto } from '../../../models/apply-histories/dtos/request-dto/apply-job.dto';

describe('ApplyHistoriesService', () => {
  let applyHistoriesService: ApplyHistoriesService;
  let jobsRepository: JobsRepository;
  let usersRepository: UsersRepository;
  let applyHistoriesRepository: ApplyHistoriesRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ApplyHistoriesService,
        {
          provide: JobsRepository,
          useValue: {
            findJobById: jest.fn((jobId) => {
              const company = new Company();
              company.id = faker.datatype.uuid();
              company.country = '한국';
              company.region = '서울';
              company.name = faker.company.companyName();
              const job = new Job(
                '백엔드 개발자(Node.js)',
                '백엔드 개발자',
                1000000,
                'Node.js',
                faker.datatype.uuid(),
              );
              job.id = jobId;
              job.setCompany(company);
              return job;
            }),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            findUserById: jest.fn((userId) => {
              const user = new User();
              user.id = userId;
              user.email = faker.internet.email();
              user.name = faker.internet.userName();
              user.nickname = faker.internet.userName();
              user.password = faker.internet.password();

              return user;
            }),
          },
        },
        {
          provide: ApplyHistoriesRepository,
          useValue: {
            findApplyHistoryByJobIdAndUserId: jest.fn((jobId, userId) => {
              const applyHistory = new ApplyHistory();
              applyHistory.id = faker.datatype.uuid();
              return applyHistory;
            }),
            createHistory: jest.fn((applyHistory) => {
              return {
                identifiers: [{ id: applyHistory['id'] }],
              };
            }),
          },
        },
      ],
    }).compile();

    applyHistoriesService = moduleRef.get<ApplyHistoriesService>(
      ApplyHistoriesService,
    );
    jobsRepository = moduleRef.get<JobsRepository>(JobsRepository);
    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    applyHistoriesRepository = moduleRef.get<ApplyHistoriesRepository>(
      ApplyHistoriesRepository,
    );
  });

  describe('applyJob', () => {
    it('실패 - DB에 채용공고가 존재하지 않는 경우', async () => {
      const applyJobDto = new ApplyJobDto();
      applyJobDto.jobId = faker.datatype.uuid();
      applyJobDto.userId = faker.datatype.uuid();

      jest.spyOn(jobsRepository, 'findJobById').mockResolvedValue(undefined);

      try {
        await applyHistoriesService.applyJob(applyJobDto);
      } catch (err) {
        expect(err).toEqual(
          new NotFoundException('존재하지 않는 채용공고입니다.'),
        );
      }
    });

    it('실패 - DB에 유저가 존재하지 않는 경우', async () => {
      const applyJobDto = new ApplyJobDto();
      applyJobDto.jobId = faker.datatype.uuid();
      applyJobDto.userId = faker.datatype.uuid();

      jest.spyOn(usersRepository, 'findUserById').mockResolvedValue(undefined);

      try {
        await applyHistoriesService.applyJob(applyJobDto);
      } catch (err) {
        expect(err).toEqual(
          new NotFoundException('존재하지 않는 사용자입니다.'),
        );
      }
    });

    it('실패 - 유저가 이미 채용공고에 지원한 경우', async () => {
      const applyJobDto = new ApplyJobDto();
      applyJobDto.jobId = faker.datatype.uuid();
      applyJobDto.userId = faker.datatype.uuid();

      try {
        await applyHistoriesService.applyJob(applyJobDto);
      } catch (err) {
        expect(err).toEqual(
          new ForbiddenException('이미 지원한 채용공고입니다.'),
        );
      }
    });

    it('성공 - 지원내역의 id를 반환', async () => {
      const applyJobDto = new ApplyJobDto();
      applyJobDto.jobId = faker.datatype.uuid();
      applyJobDto.userId = faker.datatype.uuid();

      jest
        .spyOn(applyHistoriesRepository, 'findApplyHistoryByJobIdAndUserId')
        .mockResolvedValue(undefined);

      const createdHistory = await applyHistoriesService.applyJob(applyJobDto);
      expect(createdHistory).toHaveProperty('historyId');
    });
  });
});
