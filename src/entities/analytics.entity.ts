import {
  BaseEntity,
  Column,
  JoinColumn,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  Index
} from 'typeorm';
import { Platform } from 'src/common/constants/types/platform';
import { AnalyticsYoutube } from './analytics-youtube.entity';
import { Creator } from './creator.entity';
import { Integration } from './integration.entitiy';

@Entity('analytics')
@Index(['creatorId', 'platform'], { unique: true })
export class Analytics extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  creatorId: number;

  @Column({ type: 'int', nullable: true, default: null })
  integrationId: number;
  //TODO: NEW TABLE PLATFORM AND RELATION BETWEEN PLATFORMID
  @Column({ type: 'text' })
  platform: Platform;

  @Column({ type: 'int', nullable: true, default: null })
  analyticsYoutubeId: number;

  @ManyToOne(() => Creator, (creator) => creator.analytics)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
  creator!: Creator;

  @OneToOne(() => Integration)
  @JoinColumn({ name: 'integrationId', referencedColumnName: 'id' })
  integration!: Integration;

  @OneToOne(() => AnalyticsYoutube)
  @JoinColumn({ name: 'analyticsYoutubeId', referencedColumnName: 'id' })
  analyticsYoutube: AnalyticsYoutube;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
