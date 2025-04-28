import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 4, { message: 'Size must be between 1 and 4 characters' })
  size: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  product_id: number;
}
