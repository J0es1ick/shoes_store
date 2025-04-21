import { Transform } from 'class-transformer';
import { IsString, IsEmail, Matches, IsPhoneNumber } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Index()
  supplier_id: number;

  @Column({ unique: true })
  @Index()
  @IsString()
  supplier_name: string;

  @Column({ unique: true })
  @Index()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Column({ unique: true })
  @Index()
  @IsString()
  @IsPhoneNumber(undefined, {
    message:
      'Invalid phone number. Must include country code (e.g., +1234567890)',
  })
  @Transform(({ value }) => {
    return value.replace(/[^\d+]/g, '');
  })
  @Matches(/^\+?\d{10,15}$/, {
    message:
      'Phone number must be 10-15 digits long (optionally starting with +)',
  })
  phone: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];
}
