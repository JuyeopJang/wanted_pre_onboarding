import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SeederService } from './database/seeders/seeder.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly seederService: SeederService) {}

  async onApplicationBootstrap() {
    await this.seederService.seed();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
