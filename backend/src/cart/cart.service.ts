import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart() {
    return this.prisma.cart.create({
      data: {},
    });
  }

  async addToCart(dto: AddToCartDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: dto.cartId,
        productId: dto.productId,
        quantity: dto.quantity,
      },
    });
  }

  async findOne(id: number) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        id,
      },

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }
}
