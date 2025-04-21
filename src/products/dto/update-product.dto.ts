import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  IsInt,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (value ? parseFloat(value) : undefined))
  price?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  category_id?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  supplier_id?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  brand_id?: number;
}
