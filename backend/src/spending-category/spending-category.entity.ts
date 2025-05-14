import { Column, PrimaryGeneratedColumn } from 'typeorm';

import { Entity } from 'typeorm';

@Entity()
export class SpendingCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
