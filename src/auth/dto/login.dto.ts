import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    description: 'Email adress',
    example: 'admin@gmail.com',
  })
  @IsString({ message: 'Email must be string' })
  @IsNotEmpty({ message: 'Email must be filled' })
  @IsEmail({}, { message: 'Incorrect format of Email' })
  email: string;

  @ApiProperty({
    description: 'Account password',
    example: '123456',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password must be filled' })
  @MinLength(6, { message: 'Password must be more than 5 characters' })
  @MaxLength(128, { message: 'Password must not be more than 128 characters' })
  password: string;
}
