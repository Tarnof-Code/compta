import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto {
  accountName: string;
  bankName: string;
  balance: number;
}
