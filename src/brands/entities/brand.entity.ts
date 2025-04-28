import { IsString } from 'class-validator';
import { Product } from '../../products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Index()
  brand_id: number;

  @Column({ unique: true })
  @Index()
  @IsString()
  brand_name: string;

  @Column()
  @IsString()
  country: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
