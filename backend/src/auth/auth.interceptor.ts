import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log('Requête reçue');
    return next
      .handle()
      .pipe(tap(() => console.log(`Requête traitée en ${Date.now() - now}ms`)));
  }
}
