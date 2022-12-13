import {
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  Index
} from 'typeorm';
import { User } from './user.entity';

@Entity('connection')
@Index(['userRequesterId', 'userAddressedId'], { unique: true })
export class Connection extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  userRequesterId!: number;

  @PrimaryColumn({ type: 'int' })
  userAddressedId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userRequesterId', referencedColumnName: 'id' })
  userRequester: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddressedId', referencedColumnName: 'id' })
  userAddressed: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
