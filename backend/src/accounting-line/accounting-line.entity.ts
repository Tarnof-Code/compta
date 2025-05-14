// src/accounting-line/entities/accounting-line.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from '../accounts/account.entity';
import { SpendingCategory } from '../spending-category/spending-category.entity';
import { MovementType } from '../enums/movement-type';

@Entity()
export class AccountingLine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionDate: Date;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => SpendingCategory, { eager: true })
  @JoinColumn({ name: 'spending_category_id' })
  spendingCategory: SpendingCategory;

  @Column({ type: 'enum', enum: MovementType })
  movementType: MovementType;

  @ManyToOne(() => Account, { eager: true })
  @JoinColumn({ name: 'debited_account_id' })
  debitedAccount?: Account;

  @ManyToOne(() => Account, { eager: true })
  @JoinColumn({ name: 'credited_account_id' })
  creditedAccount?: Account;
}
