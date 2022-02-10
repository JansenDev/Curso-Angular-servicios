import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { StoreService } from '../../service/store.service';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.shoppingCart = this.storeService.getShopping_cart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe((data) => {
      this.products = data;
    });
  }

  products: Product[] = [];
  shoppingCart: Product[] = [];
  priceTotal_cart = 0;

  addProduct_cart(product: Product) {
    this.storeService.addProduct_cart(product);
    this.priceTotal_cart = this.storeService.totalPrice_cart();
  }
}
