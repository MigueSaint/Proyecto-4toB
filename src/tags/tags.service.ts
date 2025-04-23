import { Injectable } from '@nestjs/common';
import { TagDto } from './dto/tag.dto/tag.dto';
import { Tag } from './tag/tag.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TagsService {
  private tags: Tag[] = [];

  // Obtener todos los tags
  getAll(): Tag[] {
    return this.tags;
  }

  // Obtener un tag por ID
  getId(id: string): Tag {
    const tag = this.tags.find((tag) => tag.id === id);
    if (!tag) {
      throw new Error(`Tag with id ${id} not found`);
    }
    return tag;
  }

  // Insertar un nuevo tag (validación del UUID generado)
  insert(tagDto: TagDto): Tag {
    const tag: Tag = {
      id: uuidv4(), // Genera un UUID v4 para el ID
      name: tagDto.name,
      description: tagDto.description,
      slug: tagDto.slug,
      stock: tagDto.stock,
    };
    this.tags.push(tag);
    return tag;
  }

  // Actualizar un tag completamente
  update(id: string, tagDto: TagDto): Tag {
    const index = this.tags.findIndex((tag) => tag.id === id);
    if (index === -1) {
      throw new Error(`Tag with id ${id} not found`);
    }
    const updatedTag = { ...this.tags[index], ...tagDto };
    this.tags[index] = updatedTag;
    return updatedTag;
  }

  // Actualizar parcialmente un tag
  patch(id: string, tagDto: Partial<TagDto>): Tag {
    const index = this.tags.findIndex((tag) => tag.id === id);
    if (index === -1) {
      throw new Error(`Tag with id ${id} not found`);
    }
    const updatedTag = { ...this.tags[index], ...tagDto };
    this.tags[index] = updatedTag;
    return updatedTag;
  }

  // Eliminar un tag
  delete(id: string): string {
    const index = this.tags.findIndex((tag) => tag.id === id);
    if (index === -1) {
      throw new Error(`Tag with id ${id} not found`);
    }
    this.tags.splice(index, 1);
    return `Tag with id ${id} deleted`;
  }

  // Obtener todos los slugs generados
   getAllSlugs(): string[] {
    return this.tags.map(t => t.slug);
  }

  findBySlug(slug: string): Tag {
    const tag = this.tags.find((t) => t.slug === slug);
    if (!tag) {
      throw new Error (`Tag with slug "${slug}" not found`);
    }
    return tag;
  }
  
}
