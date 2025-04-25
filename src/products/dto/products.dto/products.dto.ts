// products/dto/products.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
  userId: number; // Para la relación Many-to-One
}


export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsNumber()
  stock?: number;

  @IsNumber()
  userId?: number; // Para actualizar la relación
}

export class ProductSizeInput {
  sizeName: string;        // Buscará por nombre de talla
  euSize: string;
  usSize: string;
  ecuadorSize: string;
  gender: 'hombre' | 'mujer' | 'niño';
  price: number;
  stock: number;
}

