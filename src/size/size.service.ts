import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './size.entity';
import { sizeEquivalences } from './constants/size-mapping';
import { CreateSizeDto, UpdateSizeDto } from './dto/size.dto/size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  findAll(): Promise<Size[]> {
    return this.sizeRepository.find();
  }

  async findOne(id: number): Promise<Size> {
    const size = await this.sizeRepository.findOne({ where: { id } });
    if (!size) throw new NotFoundException(`Talla con ID ${id} no encontrada`);
    return size;
  }

  async create(createDto: CreateSizeDto): Promise<Size> {
    const { name, ecSize, gender } = createDto;
    const eq = sizeEquivalences[ecSize];
    if (!eq) throw new NotFoundException(`No hay equivalencia para ecSize ${ecSize}`);

    const size = this.sizeRepository.create({
      name,
      ecSize,
      usSize: eq.usSize,
      euSize: eq.euSize,
      gender,
    });
    return this.sizeRepository.save(size);
  }

  async update(id: number, updateDto: UpdateSizeDto): Promise<Size> {
    const size = await this.findOne(id);

    if (updateDto.ecSize) {
      const eq = sizeEquivalences[updateDto.ecSize];
      if (!eq) throw new NotFoundException(`No hay equivalencia para ecSize ${updateDto.ecSize}`);
      size.ecSize = updateDto.ecSize;
      size.usSize = eq.usSize;
      size.euSize = eq.euSize;
    }
    if (updateDto.name) size.name = updateDto.name;
    if (updateDto.gender) size.gender = updateDto.gender;

    return this.sizeRepository.save(size);
  }

  async delete(id: number): Promise<void> {
    await this.findOne(id);
    await this.sizeRepository.delete(id);
  }
}
