import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bankName: string;

  @Column()
  accountName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: string;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
