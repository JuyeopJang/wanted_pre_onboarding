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

@Entity({ name: 'job' })
export class Job implements IJob {
  constructor(
    position: string,
    reward: number,
    tech: string,
    description: string,
  ) {
    this.position = position;
    this.reward = reward;
    this.tech = tech;
    this.description = description;
  }

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

  @ManyToOne(() => Company, (company) => company.jobs, {
    nullable: false,
  })
  company: Company;

  @OneToMany(() => ApplyHistory, (applyHistory) => applyHistory.job)
  applyHistories: ApplyHistory[];

  setCompany(company: Company) {
    this.company = company;
  }
}
