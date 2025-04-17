import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Je suis dans l'interceptor");
    return next
      .handle()
      .pipe(map((data) => data.map(({ userPassword, ...user }) => user)));
  }
}
