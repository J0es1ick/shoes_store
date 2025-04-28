import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { BrandsModule } from 'src/brands/brands.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { SizesModule } from 'src/sizes/sizes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => [
      CategoriesModule,
      BrandsModule,
      SuppliersModule,
      SizesModule,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
