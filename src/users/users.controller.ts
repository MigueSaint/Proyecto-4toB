// users/users.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe, HttpStatus, HttpCode, Patch, } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { User } from './users.entity';
  import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}
  
    @Get()
    async findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(id);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.update(id, updateUserDto);
    }
  
    @Patch(':id')
    async partialUpdate(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
      await this.userService.remove(id);
    }
  }