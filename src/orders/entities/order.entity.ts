import { IsPositive } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { OrderDetails } from '../../order_details/entities/order_detail.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Index()
  order_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsPositive()
  total_amount: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails[];
}
