import {
  Body,
  Get,
  Controller,
  Post,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { FindCartDto } from './dto/find-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

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

  @Get(':id')
  findOne(@Param() params: FindCartDto) {
    return this.cartService.findOne(params.id);
  }

  @Patch('items/:id')
  updateItemQuantity(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItemQuantity(id, dto);
  }
}
