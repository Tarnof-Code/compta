import { Account } from 'src/accounts/account.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  userPassword: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  cashBalance: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
