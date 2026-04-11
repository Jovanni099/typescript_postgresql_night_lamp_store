import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  findAll() {
    return [
      { id: 1, name: 'Moon Night Lamp', price: 25 },
      { id: 2, name: 'Star Night Lamp', price: 30 },
      { id: 3, name: 'Cloud Night Lamp', price: 28 },
    ];
  }
}
