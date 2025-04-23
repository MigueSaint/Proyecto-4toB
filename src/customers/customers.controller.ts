<<<<<<< HEAD
import { Controller, Query, Get, ParseIntPipe, Param, Post, HttpCode, HttpStatus, Body, Put, Delete, Patch } from '@nestjs/common';
import {Customer} from './interface/customers/customer.interface';
import { CustomersService } from './customers.service';
import { CustomersDto } from './dto/customers.dto/customers.dto';

@Controller('customers')
export class CustomersController {
    constructor(private readonly custumerService: CustomersService) {}

    //USAR QUERY
    @Get('query')
    rutaQuery(@Query() query) {
        return `El dato query.x ha recibido el valor ${query.x} y el valor de y es: ${query.y}`;
    }

    @Get('car')
    carQuery(@Query('count') carCount: number) {
        return `CarCount: ${carCount}`;
    }

    @Get('cars')
    carsQuery(@Query('count', ParseIntPipe) carCount: number) {
        return `CarCount: ${carCount}`;
    }

    @Get()
    getAllCustomers(): Customer[]{
        return this.custumerService.getCustomers();
    }

    @Get(':id')
    async find(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
        return this.custumerService.getCustomersById(id);
        
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    createCustomer(
        @Body() customerDto: CustomersDto,
    ) {
        this.custumerService.insert(customerDto);
        return { message: 'Agregado correctamente'};
    }

    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number,
        @Body() body,
    ) {
        return this.custumerService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    delete(@Param('id') id:number){
        this.custumerService.delete(id);
    }

    @Patch(':id')
async patch(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: CustomersDto,
) {
  return this.custumerService.patch(id, body);
}
=======
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Query, Post, Put, Patch, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customers } from './customers.interface';

@Controller('customers')
export class CustomersController {

  constructor(private readonly customerService: CustomersService) { }

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
  getAllCustomers(): Customers[] {
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
    return { message: 'Agregado correctamente' };
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body,
  ) {
    this.customerService.update(id, body);
    return `Cliente con id ${id} modificado con éxito`
  }


  @Patch(':id')
  partialUpdate(
    @Param('id') id: number, 
    @Body() body
  ) {
    this.customerService.partialUpdate(id, body);
    return { message: `Cliente con ID ${id} fue actualizado parcialmente`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return `Hemos borrado al cliente ${id}`;
  }


>>>>>>> cf42c8a8409f356e528396b2c18f1407ee49c3f6
}
