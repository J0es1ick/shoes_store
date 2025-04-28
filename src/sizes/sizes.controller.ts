import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 8,
  ) {
    return this.sizesService.findAll(page, limit);
  }

  @Get(':size/:productId')
  findOne(@Param('size') size: string, @Param('productId') productId: number) {
    return this.sizesService.findOne(size, productId);
  }

  @Patch(':size/:productId')
  update(
    @Param('size') size: string,
    @Param('productId') productId: number,
    @Body() updateSizeDto: UpdateSizeDto,
  ) {
    return this.sizesService.update(size, productId, updateSizeDto);
  }

  @Delete(':size/:productId')
  remove(@Param('size') size: string, @Param('productId') productId: number) {
    return this.sizesService.remove(size, productId);
  }
}
