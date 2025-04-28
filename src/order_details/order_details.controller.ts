import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Get('detail')
  findOne(
    @Query('orderId', new ParseIntPipe({ optional: true })) orderId: number,
    @Query('productId', new ParseIntPipe({ optional: true })) productId: number,
    @Query('size') size: string,
  ) {
    return this.orderDetailsService.findOne(orderId, productId, size);
  }

  @Patch()
  update(
    @Query('orderId', new ParseIntPipe({ optional: true })) orderId: number,
    @Query('productId', new ParseIntPipe({ optional: true })) productId: number,
    @Query('size') size: string,
    @Body() updateOrderDetailsDto: UpdateOrderDetailDto,
  ) {
    return this.orderDetailsService.update(
      orderId,
      productId,
      size,
      updateOrderDetailsDto,
    );
  }

  @Delete()
  remove(
    @Query('orderId', new ParseIntPipe({ optional: true })) orderId: number,
    @Query('productId', new ParseIntPipe({ optional: true })) productId: number,
    @Query('size') size: string,
  ) {
    return this.orderDetailsService.remove(orderId, productId, size);
  }
}
