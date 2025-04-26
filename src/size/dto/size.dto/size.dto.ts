import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty()
  @IsString()
  name: string;  // "M", "L", "XL"

  @IsNotEmpty()
  @IsString()
  euSize: string;

  @IsNotEmpty()
  @IsString()
  usSize: string;

  @IsNotEmpty()
  @IsString()
  ecSize: string;

  @IsNotEmpty()
  @IsEnum(['hombre', 'mujer', 'niño'])
  gender: 'hombre' | 'mujer' | 'niño';
}

export class UpdateSizeDto {
  @IsString()
  name?: string;

  @IsString()
  euSize?: string;

  @IsString()
  usSize?: string;

  @IsString()
  ecSize?: string;

  @IsEnum(['hombre', 'mujer', 'niño'])
  gender?: 'hombre' | 'mujer' | 'niño';
}
