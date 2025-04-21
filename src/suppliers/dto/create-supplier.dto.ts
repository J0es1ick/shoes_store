import { IsString, IsEmail, IsPhoneNumber, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSupplierDto {
  @IsString()
  supplier_name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsPhoneNumber(undefined, {
    message:
      'Invalid phone number. Must include country code (e.g., +1234567890)',
  })
  @Transform(({ value }) => value.replace(/[^\d+]/g, ''))
  @Matches(/^\+?\d{10,15}$/, {
    message:
      'Phone number must be 10-15 digits long (optionally starting with +)',
  })
  phone: string;
}
