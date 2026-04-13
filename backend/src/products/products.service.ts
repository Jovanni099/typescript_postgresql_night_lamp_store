import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private products = [
    { id: 1, name: 'Moon Night Lamp', price: 25 },
    { id: 2, name: 'Star Night Lamp', price: 30 },
    { id: 3, name: 'Cloud Night Lamp', price: 28 },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  create(createProductDto: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      name: createProductDto.name,
      price: createProductDto.price,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      return { message: 'Product not found' };
    }

    if (updateProductDto.name !== undefined) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.price !== undefined) {
      product.price = updateProductDto.price;
    }

    return product;
  }

  remove(id: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      return { message: 'Product not found' };
    }
    const deleteProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);

    return deleteProduct;
  }
}
