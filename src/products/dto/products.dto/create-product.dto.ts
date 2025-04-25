// products/dto/create-product.dto.ts

export class ProductSizeInput {
    sizeName: string;        // Buscará por nombre de talla
    euSize: string;
    usSize: string;
    ecuadorSize: string;
    gender: 'hombre' | 'mujer' | 'niño';
    price: number;
    stock: number;
  }
  
  export class CreateProductDto {
    name: string;
    description: string;
    stock: number;
    userId: number;
    sizes: ProductSizeInput[];
  }
  