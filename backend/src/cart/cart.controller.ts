import {
  Body,
  Get,
  Controller,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { FindCartDto } from './dto/find-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { RemoveCartItemDto } from './dto/remove-cart-item.dto';

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

  @Delete('items/:id')
  removeItem(@Param() params: RemoveCartItemDto) {
    return this.cartService.removeItem(params.id);
  }
}
