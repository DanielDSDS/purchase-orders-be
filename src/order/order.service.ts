import { Injectable } from '@nestjs/common';
import { Order, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        products: true,
      },
    });
  }

  async getOrderById(id: number): Promise<Order> {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
  }

  async createOrder(data: {
    name: string;
    date: Date;
    total: number;
    products: Product[];
  }): Promise<Order> {
    return this.prisma.order.create({
      data: {
        ...data,
        products: {
          create: data.products,
        },
      },
      include: {
        products: true,
      },
    });
  }

  async updateOrder(id: number, data: any): Promise<Order> {
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
      include: { products: true },
    });

    const existingProductIds = existingOrder.products.map(
      (product: any) => product.id,
    );
    const newProducts = data.products.filter(
      (newProduct: any) => !existingProductIds.includes(newProduct.id),
    );

    console.log('LOGGER new prods ');
    const createdNewProducts = await Promise.all(
      newProducts.map(async (newProduct: any) => {
        return this.prisma.product.create({
          data: {
            name: newProduct.name,
            qty: newProduct.qty,
            unitPrice: newProduct.unitPrice,
          },
        });
      }),
    );

    const allProducts = [...existingOrder.products, ...createdNewProducts];

    return await this.prisma.order.update({
      where: { id },
      data: {
        ...data,
        products: {
          set: allProducts.map((product: any) => ({ id: product.id })),
        },
      },
      include: { products: true },
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
