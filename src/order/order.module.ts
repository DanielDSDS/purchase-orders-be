import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [PrismaModule, ProductsModule],
})
export class OrderModule {}
