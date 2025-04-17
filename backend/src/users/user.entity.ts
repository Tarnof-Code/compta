import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  userPassword: string;
}
