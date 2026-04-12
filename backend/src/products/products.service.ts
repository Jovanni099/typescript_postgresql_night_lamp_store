import { Injectable } from '@nestjs/common';

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

  create(productData: { name: string; price: number }) {
    const newProduct = {
      id: this.products.length + 1,
      name: productData.name,
      price: productData.price,
    };

    this.products.push(newProduct);

    return newProduct;
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
