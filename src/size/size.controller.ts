import { Controller, Get, Post, Put, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto, UpdateSizeDto } from './dto/size.dto/size.dto';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Get()
  findAll() {
    return this.sizeService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sizeService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateSizeDto) {
    return this.sizeService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateSizeDto,     // PUT usa CreateDto (reemplaza todo)
  ) {
    return this.sizeService.update(id, dto);
  }

  @Patch(':id')
  partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSizeDto,
  ) {
    return this.sizeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sizeService.delete(id);
  }
}
