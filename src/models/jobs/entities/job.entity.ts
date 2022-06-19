import { ApplyHistory } from '../../apply-histories/entities/apply-history.entity';
import { Company } from '../../companies/entities/company.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { IJob } from '../interfaces/job.interface';

@Entity({ name: 'job' })
export class Job implements IJob {
  constructor(
    title: string,
    position: string,
    reward: number,
    tech: string,
    description: string,
  ) {
    this.title = title;
    this.position = position;
    this.reward = reward;
    this.tech = tech;
    this.description = description;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ fulltext: true })
  @Column({
    length: 50,
  })
  title: string;

  @Index({ fulltext: true })
  @Column({
    length: 30,
  })
  position: string;

  @Column()
  reward: number;

  @Index({ fulltext: true })
  @Column({
    length: 30,
  })
  tech: string;

  @Index({ fulltext: true })
  @Column({
    length: 5000,
  })
  description: string;

  @Index()
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
