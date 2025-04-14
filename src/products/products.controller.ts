import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  //  RUTAS FIJAS PRIMERO

  // Ruta específica para pruebas
  @Get('inventario')
  getInventario(): string {
    return 'Estamos en producción';
  }

  // Ruta de error personalizada
  @Get('ruta-error-404')
  @HttpCode(HttpStatus.NOT_FOUND)
  rutaConError404() {
    throw new NotFoundException('Esto es un error 404!! no existe');
  }

  // Ejemplo con respuesta manual usando @Res()
  @Get('detalle/:id')
  findWithResponse(@Res() response, @Param('id') id: number) {
    if (id < 100) {
      return response
        .status(HttpStatus.OK)
        .send(`Página del producto: ${id}`);
    } else {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send(`Producto inexistente`);
    }
  }

  // Ejemplo de ruta con múltiples parámetros
  @Get(':id/:size')
  findWithSize(@Param('id') id: number, @Param('size') size: string) {
    return `Detalle del producto ${id}, en tamaño ${size}`;
  }

  // 🟢 RUTAS DINÁMICAS AL FINAL

  // Obtener todos los productos
  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAll();
  }

  // Obtener un producto por ID
  @Get(':id')
  find(@Param('id') id: number) {
    const product = this.productsService.getId(id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no se a encontrado`);
    }
    return {
      message: `El producto con ID ${id} sí existe.`,
      data: product,
    };
  }

  // Crear un producto
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createProduct(@Body() body) {
    if (!body.name || !body.description) {
      throw new HttpException(
        'Faltan campos obligatorios: name y description',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      this.productsService.insert(body);
      return { message: 'Producto creado correctamente' };
    } catch (error) {
      throw new HttpException(
        'Error al crear el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Actualizar un producto completamente
  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    const product = this.productsService.getId(id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    try {
      return this.productsService.update(id, body);
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Actualización parcial
  @Patch(':id')
  partialUpdate(@Param('id') id: number, @Body() body) {
    const product = this.productsService.getId(id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    try {
      return this.productsService.update(id, {
        ...product,
        ...body,
      });
    } catch (error) {
      throw new HttpException(
        'Error al hacer la actualización parcial',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Eliminar un producto
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    const product = this.productsService.getId(id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    try {
      this.productsService.delete(id);
    } catch (error) {
      throw new HttpException(
        'Error al eliminar el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}