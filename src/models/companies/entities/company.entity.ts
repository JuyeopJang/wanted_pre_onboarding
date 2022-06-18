import { Job } from 'src/models/jobs/entities/job.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ICompany } from '../interfaces/company.interface';

@Entity({ name: 'company' })
export class Company implements ICompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 30,
  })
  country: string;

  @Column({
    length: 50,
  })
  region: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];
}
