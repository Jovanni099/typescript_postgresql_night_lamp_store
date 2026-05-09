import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  create() {
    return this.cartService.createCart();
  }

  @Post('add')
  addToCart(@Body() dto: AddToCartDto) {
    return this.cartService.addToCart(dto);
  }
}
