import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './product/product.module';

@Module({
  imports: [OrderModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
