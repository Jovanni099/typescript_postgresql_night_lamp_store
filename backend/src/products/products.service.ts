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
}
