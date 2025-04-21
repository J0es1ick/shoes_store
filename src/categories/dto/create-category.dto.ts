import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  category_name: string;
}
