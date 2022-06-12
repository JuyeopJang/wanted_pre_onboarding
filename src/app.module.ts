import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlDatabaseProviderModule } from './providers/database/mysql/provider.mysql';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MysqlDatabaseProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}