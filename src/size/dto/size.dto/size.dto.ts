import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum EcSizeEnum {
  EP = 'EP',
  P = 'P',
  M = 'M',
  G = 'G',
  EG = 'EG',
  EEG = 'EEG',
  EEEG = 'EEEG',
}

export enum GenderEnum {
  Hombre = 'hombre',
  Mujer = 'mujer',
  Niño = 'niño',
}

export class CreateSizeDto {
  @IsNotEmpty() @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(EcSizeEnum, { message: 'ecSize debe ser EP, P, M, G, EG, EEG o EEEG' })
  ecSize: EcSizeEnum;

  @IsNotEmpty()
  @IsEnum(GenderEnum, { message: 'gender debe ser hombre, mujer o niño' })
  gender: GenderEnum;
}

export class UpdateSizeDto {
  @IsString()
  name?: string;

  @IsEnum(EcSizeEnum, { message: 'ecSize debe ser EP, P, M, G, EG, EEG o EEEG' })
  ecSize?: EcSizeEnum;

  @IsEnum(GenderEnum, { message: 'gender debe ser hombre, mujer o niño' })
  gender?: GenderEnum;
}
