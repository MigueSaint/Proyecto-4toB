// users/dto/users.dto.ts
import { IsNotEmpty, IsString, IsEmail, IsDate, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDate()
  birthday: Date;

  @IsNotEmpty()
  @IsInt()
  identification: number;
}

export class UpdateUserDto {
  @IsString()
  name?: string;

  @IsString()
  last_name?: string;

  @IsEmail()
  email?: string;

  @IsDate()
  birthday?: Date;

  @IsInt()
  identification?: number;
}