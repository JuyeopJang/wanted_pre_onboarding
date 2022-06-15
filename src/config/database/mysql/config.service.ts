import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ApplyHistory } from 'src/models/apply-histories/entities/apply-history.entity';
import { Company } from 'src/models/companies/entities/company.entity';
import { Job } from 'src/models/jobs/entities/job.entity';
import { User } from 'src/models/users/entities/user.entity';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: this.configService.get<string>('MYSQL_HOST'),
      port: this.configService.get<number>('MYSQL_PORT'),
      username: this.configService.get<string>('MYSQL_USERNAME'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
      entities: [User, Company, Job, ApplyHistory],
      synchronize: true,
      dropSchema: true,
      logging: true,
    };
  }
}
