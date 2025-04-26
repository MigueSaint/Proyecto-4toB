import { IsNotEmpty, IsString, IsEmail, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

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
  @Type(() => Date)
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