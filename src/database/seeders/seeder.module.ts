import { Module } from '@nestjs/common';
import { CompaniesModule } from 'src/models/companies/companies.module';
import { UsersModule } from 'src/models/users/users.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [UsersModule, CompaniesModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
