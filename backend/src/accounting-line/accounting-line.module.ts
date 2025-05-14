import { Module } from '@nestjs/common';
import { AccountingLineController } from './accounting-line.controller';
import { AccountingLineService } from './accounting-line.service';

@Module({
  controllers: [AccountingLineController],
  providers: [AccountingLineService]
})
export class AccountingLineModule {}
