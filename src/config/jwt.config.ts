/* eslint-disable @typescript-eslint/require-await */
import type { JwtModuleOptions } from './../../node_modules/@nestjs/jwt/dist/interfaces/jwt-module-options.interface.d';
import { ConfigService } from '@nestjs/config';

export async function getJwtConfig(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: configService.getOrThrow<string>('JWT_SECRET'),
    signOptions: {
      algorithm: 'HS256',
    },
    verifyOptions: {
      algorithms: ['HS256'],
      ignoreExpiration: false,
    },
  };
}
