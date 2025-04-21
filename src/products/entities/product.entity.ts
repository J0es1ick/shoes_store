import { IsPositive, IsString } from 'class-validator';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import {
  PrimaryGeneratedColumn,
  Index,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Index()
  product_id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsPositive()
  current_price: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_ID' })
  category: Category;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: 'supplier_ID' })
  supplier: Supplier;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_ID' })
  brand: Brand;
}
