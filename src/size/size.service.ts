import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}

  findAll(): Promise<Size[]> {
    return this.sizeRepository.find();
  }

  async findOne(id: number): Promise<Size> {
    const size = await this.sizeRepository.findOne({ where: { id } });
    if (!size) {
      throw new NotFoundException(`Tamaño con ID ${id} no encontrado`);
    }
    return size;
  }

  create(size: Size): Promise<Size> {
    return this.sizeRepository.save(size);
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.sizeRepository.delete(id);
  }

  update(id: number, size: Partial<Size>): Promise<Size> {
    return this.sizeRepository.save({ ...size, id });
  }

  updatePartial(id: number, size: Partial<Size>): Promise<Size> {
    return this.sizeRepository.save({ ...size, id });
  }
}
