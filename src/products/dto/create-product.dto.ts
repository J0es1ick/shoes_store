import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsInt,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  category_id: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  supplier_id: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  brand_id: number;
}
