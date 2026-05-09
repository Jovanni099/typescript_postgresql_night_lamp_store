import { IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  @Min(1)
  cartId!: number;

  @IsInt()
  @Min(1)
  productId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}
