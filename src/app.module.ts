import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.mysql';
import { APP_PIPE } from '@nestjs/core';
import { JobsModule } from './models/jobs/jobs.module';
import { SeederModule } from './database/seeders/seeder.module';
import { ApplyHistoriesModule } from './models/apply-histories/apply-histories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MysqlDatabaseProviderModule,
    JobsModule,
    SeederModule,
    ApplyHistoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
