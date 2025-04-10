import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Query, Post, Put, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from './customers.interface';

@Controller('customers')
export class CustomersController {

    constructor (private readonly customerService: CustomersService) {}

//Usar QUERY
@Get('query')
rutaQuery(@Query() query) {
  return `El dato query.x ha recibido el valor ${query.x} y el valor de y es: ${query.y}`;
}

@Get('car')
carQuery(@Query('count') carCount: number) {
  return carCount;
}

@Get('cars')
carsQuery(@Query('count', ParseIntPipe) carCount: number) {
  return `carCount: ${carCount}`;
}

@Get()
getAllCustomers(): Customers[]{
  return this.customerService.getCustomers();
}

@Get(':id')
find(@Param('id') id: number) {
  return this.customerService.getId(id);
}

@Post()
@HttpCode(HttpStatus.OK)
createCustomer(
  @Body() body,
) {
  this.customerService.insert(body);
  return {message: 'Agregado correctamente'};
}

@Put(':id')
  update(
    @Param('id') id: number, 
    @Body() body,
  ) {
    return this.customerService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return `Hemos borrado al cliente ${id}`;
  }

}
