import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find(); // récupère tous les utilisateurs
  }

  async getUser(userName: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ ['userName']: userName }); // récupère un utilisateur
  }

  async createUser(user: User): Promise<string> {
    const userHashedPassword = await this.hashPassword(user.userPassword);
    try {
      await this.userRepository.save({
        ...user,
        userPassword: userHashedPassword,
      }); // insère un nouvel utilisateur avec un mot de passe crypté
      return `L'utilisateur ${user.userName} a été créé avec succès`;
    } catch (error) {
      console.log('error :::::', error);
      throw new Error('Failed to create user');
    }
  }

  private async hashPassword(password: string) {
    const hashedPassword = await hash(password, 9);
    return hashedPassword;
  }
}
