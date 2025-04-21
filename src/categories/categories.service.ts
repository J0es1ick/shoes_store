import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { category_name: createCategoryDto.category_name },
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const query = this.categoryRepository.createQueryBuilder('category');

    if (search) {
      query.andWhere('category.category_name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [categories, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: categories,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({
      category_id: id,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (updateCategoryDto.category_name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { category_name: updateCategoryDto.category_name },
      });

      if (existingCategory && existingCategory.category_id !== id) {
        throw new ConflictException('Category with this name already exists');
      }
    }

    const updatedCategory = this.categoryRepository.merge(
      category,
      updateCategoryDto,
    );
    return this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number) {
    const result = await this.categoryRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
