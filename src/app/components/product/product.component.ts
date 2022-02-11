import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  constructor() {}

  @Input()
  product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: '',
  };

  @Input()
  image = '';

  @Output()
  addProduct_cart = new EventEmitter<Product>();

  onAddProduct_cart() {
    this.addProduct_cart.emit(this.product);
  }
}
