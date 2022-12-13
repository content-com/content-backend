import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Analytics, User } from './index';

@Entity('creator')
export class Creator extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ unique: true, type: 'varchar', length: 100, nullable: true })
  userName: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'text', nullable: true })
  profileImage: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  youtubeLinked: Boolean;

  @Column({ type: 'boolean', default: false })
  twitchLinked: Boolean;

  @Column({ type: 'text', array: true, nullable: true })
  contentType: string[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Analytics, (analytics) => analytics.creator)
  analytics!: Analytics[];
}
