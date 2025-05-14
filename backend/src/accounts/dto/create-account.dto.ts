import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
