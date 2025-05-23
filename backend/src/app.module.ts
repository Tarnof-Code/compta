import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './accounts/accounts.module';
import { AccountingLineModule } from './accounting-line/accounting-line.module';
import { SpendingCategoryModule } from './spending-category/spending-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables d'environnement disponibles à tous les modules
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
          synchronize: true, // TODO: Remove in production}
        };
      },
    }),
    MessagesModule,
    UsersModule,
    AuthModule,
    ConfigModule,
    AccountModule,
    AccountingLineModule,
    SpendingCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
