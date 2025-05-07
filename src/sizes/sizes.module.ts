import { forwardRef, Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { Size } from './entities/size.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { OrderDetailsModule } from 'src/order_details/order_details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Size]),
    forwardRef(() => ProductsModule),
    forwardRef(() => OrderDetailsModule),
  ],
  controllers: [SizesController],
  providers: [SizesService],
  exports: [SizesService, TypeOrmModule],
})
export class SizesModule {}
