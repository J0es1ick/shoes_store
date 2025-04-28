import { forwardRef, Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { Size } from './entities/size.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Size]), forwardRef(() => ProductsModule)],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
