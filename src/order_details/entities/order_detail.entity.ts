import { IsPositive } from 'class-validator';
import { Order } from '../../orders/entities/order.entity';
import { Size } from '../../sizes/entities/size.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderDetails {
  @PrimaryColumn({ type: 'bigint', name: 'order_id' })
  order_id: number;

  @PrimaryColumn({ type: 'bigint', name: 'product_id' })
  product_id: number;

  @PrimaryColumn({ type: 'char', length: 4, name: 'size' })
  size: string;

  @Column({ type: 'int' })
  @IsPositive()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsPositive()
  price_at_order: number;

  @ManyToOne(() => Size, (size) => size.product)
  @JoinColumn([
    { name: 'product_id', referencedColumnName: 'product_id' },
    { name: 'size', referencedColumnName: 'size' },
  ])
  sizeEntity: Size;

  @ManyToOne(() => Order, (order) => order.order_id)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
