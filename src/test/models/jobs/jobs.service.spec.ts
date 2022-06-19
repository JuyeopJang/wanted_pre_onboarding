import { Test } from '@nestjs/testing';
import { PostJobDto } from '../../../models/jobs/dtos/request-dto/post-job.dto';
import { JobsService } from '../../../models/jobs/jobs.service';
import { faker } from '@faker-js/faker';
import { JobsRepository } from '../../../models/jobs/jobs.repository';
import { CompaniesRepository } from '../../../models/companies/companies.repository';
import { NotFoundException } from '@nestjs/common';
import { Company } from '../../../models/companies/entities/company.entity';
import { Job } from '../../../models/jobs/entities/job.entity';
import { UpdateJobDto } from '../../../models/jobs/dtos/request-dto/update-job.dto';
import { JobListDto } from '../../../models/jobs/dtos/request-dto/job-list.dto';

describe('JobsService', () => {
  let jobsService: JobsService;
  let jobsRepository: JobsRepository;
  let companiesRepository: CompaniesRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: JobsRepository,
          useValue: {
            createJob: jest.fn((job) => {
              return {
                identifiers: [{ id: job['id'] }],
              };
            }),
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
            deleteJobById: jest.fn(() => undefined),
            updateJobById: jest.fn(() => undefined),
            getJobsUsingQuery: jest.fn((keyword, limit, offset) => {
              return [
                {
                  id: faker.datatype.uuid(),
                  title: '백엔드 개발자(Node.js)',
                  reward: 1000000,
                  company: {
                    name: faker.company.companyName(),
                    country: '한국',
                    region: '서울',
                  },
                },
              ];
            }),
          },
        },
        {
          provide: CompaniesRepository,
          useValue: {
            findCompanyById: jest.fn((companyId) => new Company()),
          },
        },
      ],
    }).compile();

    jobsService = moduleRef.get<JobsService>(JobsService);
    jobsRepository = moduleRef.get<JobsRepository>(JobsRepository);
    companiesRepository =
      moduleRef.get<CompaniesRepository>(CompaniesRepository);
  });

  describe('postJob', () => {
    it('실패 - DB에 company가 존재하지 않는 경우', async () => {
      const postJobDto = new PostJobDto();
      postJobDto.companyId = faker.datatype.uuid();
      postJobDto.description = faker.lorem.paragraphs();
      postJobDto.position = '백엔드 개발자';
      postJobDto.reward = 1000000;
      postJobDto.tech = 'Node.js';
      postJobDto.title = '백엔드 개발자(Node.js)';

      jest
        .spyOn(companiesRepository, 'findCompanyById')
        .mockResolvedValue(undefined);

      try {
        await jobsService.postJob(postJobDto);
      } catch (err) {
        expect(err).toEqual(new NotFoundException('존재하지 않는 회사입니다.'));
      }
    });

    it('성공 - 생성된 job의 id를 반환', async () => {
      const postJobDto = new PostJobDto();
      postJobDto.companyId = faker.datatype.uuid();
      postJobDto.description = faker.lorem.paragraphs();
      postJobDto.position = '백엔드 개발자';
      postJobDto.reward = 1000000;
      postJobDto.tech = 'Node.js';
      postJobDto.title = '백엔드 개발자(Node.js)';

      const jobId = await jobsService.postJob(postJobDto);

      expect(jobId).toHaveProperty('jobId');
    });
  });

  describe('deleteJob', () => {
    it('실패 - DB에 job이 존재하지 않는 경우', async () => {
      const jobId = faker.datatype.uuid();
      jest.spyOn(jobsRepository, 'findJobById').mockResolvedValue(undefined);

      try {
        await jobsService.deleteJob(jobId);
      } catch (err) {
        expect(err).toEqual(
          new NotFoundException('존재하지 않는 채용공고입니다.'),
        );
      }
    });

    it('성공 - undefined 반환', async () => {
      const jobId = faker.datatype.uuid();

      const result = await jobsService.deleteJob(jobId);
      expect(result).toBe(undefined);
    });
  });

  describe('updateJob', () => {
    it('실패 - DB에 job이 존재하지 않는 경우', async () => {
      const jobId = faker.datatype.uuid();
      const updateJobDto = new UpdateJobDto();
      updateJobDto.reward = 2000000;

      jest.spyOn(jobsRepository, 'findJobById').mockResolvedValue(undefined);

      try {
        await jobsService.updateJob(jobId, updateJobDto);
      } catch (err) {
        expect(err).toEqual(
          new NotFoundException('존재하지 않는 채용공고입니다.'),
        );
      }
    });

    it('성공 - reward 수정', async () => {
      const jobId = faker.datatype.uuid();
      const updateJobDto = new UpdateJobDto();
      updateJobDto.reward = 2000000;

      const result = await jobsService.updateJob(jobId, updateJobDto);
      expect(result.updatedReward).toBe(2000000);
    });
  });

  describe('findJob', () => {
    it('실패 - DB에 job이 존재하지 않는 경우', async () => {
      const jobId = faker.datatype.uuid();

      jest.spyOn(jobsRepository, 'findJobById').mockResolvedValue(undefined);

      try {
        await jobsService.findJob(jobId);
      } catch (err) {
        expect(err).toEqual(
          new NotFoundException('존재하지 않는 채용공고입니다.'),
        );
      }
    });

    it('성공 - job 반환', async () => {
      const jobId = faker.datatype.uuid();

      const result = await jobsService.findJob(jobId);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('position');
      expect(result).toHaveProperty('reward');
      expect(result).toHaveProperty('tech');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('company');
      expect(result.company).toHaveProperty('id');
      expect(result.company).toHaveProperty('name');
      expect(result.company).toHaveProperty('country');
      expect(result.company).toHaveProperty('region');
    });
  });

  describe('showJobs', () => {
    it('성공 - DB에서 원하는 조건의 채용공고를 가져오지 못한 경우', async () => {
      const jobListDto = new JobListDto();
      jobListDto.keyword = 'Node.js';
      jobListDto.limit = 1;
      jobListDto.offset = 0;

      jest.spyOn(jobsRepository, 'getJobsUsingQuery').mockResolvedValue([]);

      const result = await jobsService.showJobs(jobListDto);
      expect(result).toBe(null);
    });

    it('성공 - 여러 채용공고를 가져온 경우', async () => {
      const jobListDto = new JobListDto();
      jobListDto.keyword = 'Node.js';
      jobListDto.limit = 1;
      jobListDto.offset = 0;

      const result = await jobsService.showJobs(jobListDto);
      expect(result).toBeTruthy();
    });
  });
});
