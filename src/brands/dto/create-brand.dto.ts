import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBrandDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  brand_name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  country: string;
}
