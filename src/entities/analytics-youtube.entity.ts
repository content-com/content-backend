import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('analyticsYoutube')
export class AnalyticsYoutube extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  totalSubscribers!: number;

  @Column({ type: 'int' })
  totalVideos!: number;

  @Column({ type: 'int' })
  lastThreeMonthsLikes!: number;

  @Column({ type: 'int' })
  lastTwoMonthVideos!: number;

  @Column({ type: 'int' })
  totalAverageViewDuration!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
