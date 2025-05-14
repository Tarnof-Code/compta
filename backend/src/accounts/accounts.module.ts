import { Module } from '@nestjs/common';
import { AccountController } from './accounts.controller';
import { AccountService } from './accounts.service';
import { Account } from './account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), UsersModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
