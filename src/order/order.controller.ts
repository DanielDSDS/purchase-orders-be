import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/order')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Post('/order')
  async createOrder(@Body() data: any) {
    return this.orderService.createOrder(data);
  }

  @Get('/order/:id')
  async getOrdereById(@Param('id') id: string) {
    return this.orderService.getOrderById(Number(id));
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(Number(id));
  }

  @Put('/order/:id')
  async updateOrder(@Param('id') id: string, @Body() data: any) {
    return this.orderService.updateOrder(Number(id), data);
  }
}
