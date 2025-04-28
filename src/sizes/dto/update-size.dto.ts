import { PartialType } from '@nestjs/mapped-types';
import { CreateSizeDto } from './create-size.dto';
import {
  IsString,
  IsOptional,
  Length,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class UpdateSizeDto extends PartialType(CreateSizeDto) {
  @IsString()
  @IsOptional()
  @Length(1, 4, { message: 'Size must be between 1 and 4 characters' })
  size?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  product_id?: number;
}
