import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { User } from 'src/users/user.entity';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async getAccountsByUserId(userId: number): Promise<Account[]> {
    return this.accountRepository.find({
      where: { user: { userId } },
      relations: ['user'],
    });
  }

  async createAccount(
    user: User,
    createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    const account = new Account();
    account.user = user;
    account.bankName = createAccountDto.bankName;
    account.accountName = createAccountDto.accountName;
    account.balance = createAccountDto.balance.toFixed(2);
    return this.accountRepository.save(account);
  }

  async updateAccount(
    accountId: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException(`Compte avec l'id ${accountId} introuvable`);
    }

    // Convertir balance en nombre si présent
    if (updateAccountDto.balance !== undefined) {
      const parsedBalance = Number(updateAccountDto.balance);
      if (isNaN(parsedBalance)) {
        throw new BadRequestException('Le solde doit être un nombre valide');
      }
      account.balance = parsedBalance.toFixed(2);
    }

    // Appliquer les autres propriétés
    if (updateAccountDto.accountName !== undefined) {
      account.accountName = updateAccountDto.accountName;
    }

    if (updateAccountDto.bankName !== undefined) {
      account.bankName = updateAccountDto.bankName;
    }

    return this.accountRepository.save(account);
  }

  async deleteAccount(accountId: number): Promise<void> {
    const result = await this.accountRepository.delete(accountId);

    if (result.affected === 0) {
      throw new NotFoundException(`Compte avec l'id ${accountId} introuvable`);
    }
  }
}
