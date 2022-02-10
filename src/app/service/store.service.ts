import { Injectable } from '@angular/core';
import { Product } from '../components/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  private shoppingCart: Product[] = [];

  addProduct_cart(product: Product) {
    this.shoppingCart.push(product);
  }

  totalPrice_cart() {
    return this.shoppingCart.reduce(
      (accum, product) => accum + product.price,
      0
    );
  }

  getShopping_cart() {
    return this.shoppingCart;
  }
}
