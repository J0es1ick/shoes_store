import { forwardRef, Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService, TypeOrmModule],
})
export class BrandsModule {}
