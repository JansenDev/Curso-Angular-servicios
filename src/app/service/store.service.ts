import { Injectable } from '@angular/core';
import { Product } from '../components/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor() {}

  private shoppingCart: Product[] = [];
  //* Se instancia el observable y se le da un valor iniciar '[]'
  private cart = new BehaviorSubject<Product[]>([]);
  //* Se crea el observable publico al cual se suscribiran con 'subscribe' los que instancien este servicio
  cart$ = this.cart.asObservable();

  addProduct_cart(product: Product) {
    this.shoppingCart.push(product);
    //* Se emite una notificacion, evento el cual los componenetes subscritos recibiran
    this.cart.next(this.shoppingCart);
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
