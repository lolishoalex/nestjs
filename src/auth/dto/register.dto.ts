import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'Name must be filled' })
  @MaxLength(50, { message: 'Name must not be more than 50 characters' })
  name: string;

  @IsString({ message: 'Email must be string' })
  @IsNotEmpty({ message: 'Email must be filled' })
  @IsEmail({}, { message: 'Incorrect format of Email' })
  email: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password must be filled' })
  @MinLength(6, { message: 'Password must be more than 5 characters' })
  @MaxLength(128, { message: 'Password must not be more than 128 characters' })
  password: string;
}
