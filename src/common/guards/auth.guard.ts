import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

Injectable();
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const request = context.switchToHttp().getRequest() as Request;
    const token = request.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException('You are not authorized');
    }
    return true;
  }
}
