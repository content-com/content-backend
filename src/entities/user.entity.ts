import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserRoles, UserType } from 'src/common/constants';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ unique: true, type: 'varchar', length: 120 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'boolean', default: false })
  emailConfirmed: Boolean;

  @Column({ type: 'boolean', default: false })
  onboardingCompleted: Boolean;

  @Column('text', { array: true, default: [UserRoles.REGULAR] })
  roles: UserRoles[];

  @Column({ type: 'varchar', length: 20 })
  type: UserType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
