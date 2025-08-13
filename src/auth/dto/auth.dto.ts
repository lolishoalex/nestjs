import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'hviyfYFGjhvuyKUyv656ETDkugfkuyg...',
  })
  accessToken: string;
}
