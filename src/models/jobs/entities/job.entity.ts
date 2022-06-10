import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
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

  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at ', type: 'timestamp' })
  updatedAt: Date;
}
