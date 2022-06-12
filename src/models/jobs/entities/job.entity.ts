import { ApplyHistory } from 'src/models/apply-histories/entities/apply-history.entity';
import { Company } from 'src/models/companies/entities/company.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IJob } from '../interfaces/job.interface';

@Entity({ name: 'jobs' })
export class Job implements IJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  position: string;

  @Column()
  reward: number;

  @Column()
  tech: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Company, (company) => company.jobs)
  company: Company;

  @OneToMany(() => ApplyHistory, (applyHistory) => applyHistory.job)
  applyHistories: ApplyHistory[];
}
