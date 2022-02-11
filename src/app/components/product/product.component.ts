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
  product: Product = {} as Product;

  @Input()
  image = '';

  @Output()
  addProduct_cart = new EventEmitter<Product>();

  @Output()
  getProductId =new EventEmitter<string>();

  onAddProduct_cart() {
    this.addProduct_cart.emit(this.product);
  }

  onShowDetailProduct(){
    this.getProductId.emit(this.product.id)
  }
}
