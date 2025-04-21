import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsPhoneNumber,
  Matches,
} from 'class-validator';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
  @IsOptional()
  @IsString()
  supplier_name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber(undefined, {
    message:
      'Invalid phone number. Must include country code (e.g., +1234567890)',
  })
  @Transform(({ value }) => (value ? value.replace(/[^\d+]/g, '') : null))
  @Matches(/^\+?\d{10,15}$/, {
    message:
      'Phone number must be 10-15 digits long (optionally starting with +)',
  })
  phone?: string;
}
