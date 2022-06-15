import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.mysql';
import { APP_PIPE } from '@nestjs/core';
import { JobsModule } from './models/jobs/jobs.module';
import { SeederModule } from './database/seeders/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MysqlDatabaseProviderModule,
    JobsModule,
    SeederModule,
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
