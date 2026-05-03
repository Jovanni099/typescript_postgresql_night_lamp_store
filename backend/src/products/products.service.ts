import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductStatus } from '@prisma/client';
// import { contains } from 'class-validator';
import { FindProductsDto, ProductSort } from './dto/find-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: FindProductsDto) {
    const {
      status,
      page = 1,
      limit = 10,
      search = '',
      sort = ProductSort.newest,
      minPrice,
      maxPrice,
    } = query;

    const skip = (page - 1) * limit;

    // const where: Prisma.ProductWhereInput = status
    //   ? {
    //       status: status as ProductStatus,
    //       name: {
    //         contains: search,
    //         mode: 'insensitive',
    //       },
    //     }
    //   : {
    //       status: 'ACTIVE',
    //       stock: { gt: 0 },
    //       name: {
    //         contains: search,
    //         mode: 'insensitive',
    //       },
    //     };

    const where: Prisma.ProductWhereInput = {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    };

    if (status) {
      where.status = status as ProductStatus;
    } else {
      where.status = 'ACTIVE';
      where.stock = { gt: 0 };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
    }

    if (minPrice !== undefined) {
      (where.price as any).gte = minPrice;
    }

    if (maxPrice !== undefined) {
      (where.price as any).lte = maxPrice;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = {
      createdAt: 'desc',
    };

    if (sort === ProductSort.price_asc) {
      orderBy = { price: 'asc' };
    }

    if (sort === ProductSort.price_desc) {
      orderBy = { price: 'desc' };
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        slug: createProductDto.slug,
        description: createProductDto.description,
        imageUrl: createProductDto.imageUrl,
        price: createProductDto.price,
        stock: createProductDto.stock,
        sku: createProductDto.sku,
        status: createProductDto.status,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      throw error;
    }
  }
}
