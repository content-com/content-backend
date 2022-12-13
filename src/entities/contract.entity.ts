import {
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  Column,
  Index
} from 'typeorm';
import { Stage, User } from './index';

@Entity('contract')
@Index(['userAdvertiserId', 'userCreatorId'], { unique: true })
export class Contract extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  userAdvertiserId!: number;

  @PrimaryColumn({ type: 'int' })
  userCreatorId!: number;

  @Column({ type: 'int' })
  stageId!: number;

  @ManyToOne(() => Stage, (stage) => stage.contracts)
  @JoinColumn({ name: 'stageId', referencedColumnName: 'id' })
  stage!: Stage;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAdvertiserId', referencedColumnName: 'id' })
  userAdvertiser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userCreatorId', referencedColumnName: 'id' })
  userCreator: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
