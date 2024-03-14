import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/product')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post('/product')
  async createProduct(@Body() data: Product) {
    return this.productService.createProduct(data);
  }

  @Get('/product/:id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() data: Product) {
    return this.productService.updateProduct(Number(id), data);
  }
}
