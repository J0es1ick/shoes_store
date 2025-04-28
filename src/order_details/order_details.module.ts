import { forwardRef, Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsController } from './order_details.controller';
import { OrdersModule } from 'src/orders/orders.module';
import { OrderDetails } from './entities/order_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizesModule } from 'src/sizes/sizes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetails]),
    forwardRef(() => [OrdersModule, SizesModule]),
  ],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
