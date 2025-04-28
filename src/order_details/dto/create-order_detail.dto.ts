import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDetailDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  size: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  product_id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  order_id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  price_at_order: number;
}
