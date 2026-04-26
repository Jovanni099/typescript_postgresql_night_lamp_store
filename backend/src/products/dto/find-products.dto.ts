import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { Type } from 'class-transformer';
import { ProductStatus } from '@prisma/client';

export class FindProductsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string = '';

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
