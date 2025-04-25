import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBodyDto } from './authBodyDto';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // On envoie les credentials pour recevoir un JWT
  @Post('login')
  @UseInterceptors(AuthInterceptor)
  async getAuth(@Body() authBody: AuthBodyDto) {
    const data = await this.authService.login(authBody);
    return data;
  }

  // On envoie le JWT pour recevoir les informations de l'utilisateur
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const data = await this.authService.getProfile(req.user.userId);
    return data;
  }
}
