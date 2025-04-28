import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Size } from './entities/size.entity';

@Injectable()
export class SizesService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    const product = await this.productRepository.findOneBy({
      product_id: createSizeDto.product_id,
    });
    if (!product) {
      throw new NotFoundException(
        `Product with id ${createSizeDto.product_id} not found`,
      );
    }

    const existingSize = await this.sizeRepository.findOne({
      where: {
        size: createSizeDto.size,
        product_id: createSizeDto.product_id,
      },
    });

    if (existingSize) {
      throw new ConflictException(
        `Size ${createSizeDto.size} already exists for product ${createSizeDto.product_id}`,
      );
    }

    const size = this.sizeRepository.create(createSizeDto);
    return this.sizeRepository.save(size);
  }

  async findAll(page: number = 1, limit: number = 8) {
    const [sizes, total] = await this.sizeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { size: 'DESC' },
    });

    return {
      data: sizes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(size: string, productId: number) {
    const sizeEntity = await this.sizeRepository.findOne({
      where: { size, product_id: productId },
      relations: ['product'],
    });

    if (!sizeEntity) {
      throw new NotFoundException(
        `Size ${size} for product ${productId} not found`,
      );
    }

    return sizeEntity;
  }

  async update(
    currentSize: string,
    currentProductId: number,
    updateSizeDto: UpdateSizeDto,
  ) {
    const size = await this.findOne(currentSize, currentProductId);

    if (updateSizeDto.size || updateSizeDto.product_id) {
      const newSize = updateSizeDto.size || size.size;
      const newProductId = updateSizeDto.product_id || size.product_id;

      const existingSize = await this.sizeRepository.findOne({
        where: {
          size: newSize,
          product_id: newProductId,
        },
      });

      if (
        existingSize &&
        (existingSize.size !== currentSize ||
          existingSize.product_id !== currentProductId)
      ) {
        throw new ConflictException(
          `Size ${newSize} already exists for product ${newProductId}`,
        );
      }

      if (updateSizeDto.product_id) {
        const productExists = await this.productRepository.exist({
          where: { product_id: updateSizeDto.product_id },
        });
        if (!productExists) {
          throw new NotFoundException(
            `Product with id ${updateSizeDto.product_id} not found`,
          );
        }
      }
    }

    this.sizeRepository.merge(size, updateSizeDto);
    return this.sizeRepository.save(size);
  }

  async remove(size: string, productId: number) {
    const result = await this.sizeRepository.delete({
      size,
      product_id: productId,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Size ${size} for product ${productId} not found`,
      );
    }
  }
}
