import { IsString } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Index()
  category_id: number;

  @Column({ unique: true })
  @Index()
  @IsString()
  category_name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
