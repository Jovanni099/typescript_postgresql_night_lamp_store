import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

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

    if (dto.quantity > product.stock) {
      throw new BadRequestException('Not enough stock');
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

    const totalPrice = cart.items.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    return {
      ...cart,
      totalPrice,
    };
  }

  async updateItemQuantity(itemId: number, dto: UpdateCartItemDto) {
    const item = await this.prisma.cartItem.findUnique({
      where: {
        id: itemId,
      },
      //   data: {
      //     quantity: dto.quantity,
      //   },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    return this.prisma.cartItem.update({
      where: {
        id: itemId,
      },
      data: {
        quantity: dto.quantity,
      },
    });
  }

  async removeItem(itemId: number) {
    const item = await this.prisma.cartItem.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    return this.prisma.cartItem.delete({
      where: {
        id: itemId,
      },
    });
  }
}
