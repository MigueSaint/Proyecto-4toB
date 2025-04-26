import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';

export class ProductSizeInput {
  @IsNotEmpty()
  @IsString()
  sizeName: string;

  @IsNotEmpty()
  @IsString()
  euSize: string;

  @IsNotEmpty()
  @IsString()
  usSize: string;

  @IsNotEmpty()
  @IsString()
  ecuadorSize: string;

  @IsNotEmpty()
  @IsEnum(['hombre', 'mujer', 'niño'])
  gender: 'hombre' | 'mujer' | 'niño';

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty({ each: true })
  sizes: ProductSizeInput[];
}
