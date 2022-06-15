import { Job } from 'src/models/jobs/entities/job.entity';
import { User } from 'src/models/users/entities/user.entity';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'apply_history' })
export class ApplyHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Job, (job) => job.applyHistories)
  job: Job;

  @ManyToOne(() => User, (user) => user.applyHistories)
  user: User;
}
