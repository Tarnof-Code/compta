import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { AuthBodyDto } from './authBodyDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authBoby: AuthBodyDto) {
    const { userName, userPassword } = authBoby;
    const existingUser = await this.userService.getUserByUserName(userName);
    if (!existingUser)
      throw new UnauthorizedException({
        error: "Mot de passe ou nom d'utilisateur incorrect",
      });
    const isPasswordValid = await this.isPasswordValid(
      userPassword,
      existingUser.userPassword,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException({
        error: "Mot de passe ou nom d'utilisateur incorrect",
      });

    return this.authentificateUser({ userId: existingUser.userId });
  }

  async getProfile(userId: number) {
    const user = await this.userService.getUserByUserId(userId);
    if (!user)
      throw new NotFoundException({
        error: 'Utilisateur non trouvé',
      });
    return { userName: user.userName, userId: user.userId };
  }

  // Fonction pour vérifier un mot de passe haché
  private async isPasswordValid(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  // Fonction qui gère le JWT
  private async authentificateUser({ userId }: { userId: number }) {
    const payload = { userId };
    return { access_token: await this.jwtService.sign(payload) };
  }
}
