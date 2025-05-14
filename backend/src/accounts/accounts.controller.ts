import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { AccountService } from './accounts.service';
import { UsersService } from '../users/users.service';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UsersService,
  ) {}

  @Get('user/:userId')
  async getAccountsByUserId(
    @Param('userId') userId: number,
  ): Promise<Account[]> {
    const userExists = await this.userService.userExists(userId);
    if (!userExists) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return this.accountService.getAccountsByUserId(userId);
  }

  @Post('user/:userId')
  async createAccount(
    @Param('userId') userId: number,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    const user = await this.userService.getUserByUserId(userId);
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return this.accountService.createAccount(user, createAccountDto);
  }

  @Patch(':accountId')
  async updateAccount(
    @Param('accountId', ParseIntPipe) accountId: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountService.updateAccount(accountId, updateAccountDto);
  }

  @Delete(':accountId')
  async deleteAccount(@Param('accountId') accountId: number): Promise<void> {
    return this.accountService.deleteAccount(accountId);
  }
}
