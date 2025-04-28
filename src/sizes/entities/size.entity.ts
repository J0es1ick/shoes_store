import { OrderDetails } from '../../order_details/entities/order_detail.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  Index,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Size {
  @PrimaryColumn({ type: 'char', length: 4 })
  @Index()
  size: string;

  @PrimaryColumn({ type: 'bigint' })
  product_id: number;

  @ManyToOne(() => Product, (product) => product.sizes)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'product_id' }])
  product: Product;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.size)
  orderDetails: OrderDetails[];
}
