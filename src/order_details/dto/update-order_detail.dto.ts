import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDetailDto } from './create-order_detail.dto';
import { IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  size?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  product_id?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  order_id?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  quantity?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => (value ? parseFloat(value) : undefined))
  price_at_order?: number;
}
