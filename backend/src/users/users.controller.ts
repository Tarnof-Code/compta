import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UsersInterceptor } from './users.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(UsersInterceptor)
  async getUsers() {
    console.log('Je suis dans le controller');
    const data = await this.usersService.getUsers();
    return data;
  }

  @Get(':userName')
  async getUser(@Param('userName') userName: string) {
    const data = await this.usersService.getUserByUserName(userName);
    return data;
  }

  @Post()
  async createUser(@Body() user: User) {
    const data = await this.usersService.createUser(user);
    return data;
  }

  @Patch(':userId/cash-balance')
  async updateCashBalance(
    @Param('userId') userId: number,
    @Body('balance') balance: number,
  ): Promise<void> {
    await this.usersService.updateCashBalance(userId, balance);
  }
}
