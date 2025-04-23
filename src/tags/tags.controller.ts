import {Body,Controller,Delete,Get,Param,Patch,Post,Put,UsePipes,ValidationPipe,HttpException,HttpStatus,} from '@nestjs/common';
import { TagDto } from './dto/tag.dto/tag.dto';
import { Tag } from './tag/tag.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // Obtener todos los tags
  @Get()
  findAll(): Tag[] {
    return this.tagsService.getAll();
  }

  // Obtener un tag por ID
  @Get(':id')
  findOne(@Param('id') id: string): Tag {
    try {
      return this.tagsService.getId(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Crear un nuevo tag (validación de ID automático con uuidv4)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: TagDto): Tag {
    try {
      return this.tagsService.insert(body);
    } catch (error) {
      throw new HttpException('Error al crear el tag', HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar un tag completamente
  @Put(':id')
  update(@Param('id') id: string, @Body() body: TagDto): Tag {
    try {
      return this.tagsService.update(id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Actualizar parcialmente un tag
  @Patch(':id')
  patch(@Param('id') id: string, @Body() body: Partial<TagDto>): Tag {
    try {
      return this.tagsService.patch(id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Eliminar un tag
  @Delete(':id')
  remove(@Param('id') id: string): string {
    try {
      return this.tagsService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Obtener todos los slugs generados
  @Get('extras/slugs')
  getSlugs(): string[] {
    return this.tagsService.getAllSlugs();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string): Tag {
    return this.tagsService.findBySlug(slug);
  }

  
}
