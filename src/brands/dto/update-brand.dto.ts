import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  brand_name?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  country?: string;
}
