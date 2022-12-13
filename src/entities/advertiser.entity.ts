import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { User } from './index';

@Entity('advertiser')
export class Advertiser extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ unique: true, type: 'varchar', length: 100, nullable: true })
  userName: string;

  @Column({ type: 'text', nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  webPageUrl: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  youtubeUrl: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  instagramUrl: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  facebookUrl: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  twitterUrl: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  tiktokUrl: string;

  @Column({ type: 'text', array: true, nullable: true })
  contentType: string[];

  @Column({ type: 'boolean', default: false })
  validated: Boolean;

  @Column({ type: 'int', default: 10 })
  credits: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
