import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Product,
  ProductDTO,
  UpdateProductDTO,
} from '../components/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  private uri_product = 'https://fakestoreapi.com/products/';

  getAllProducts() {
    return this.httpClient.get<Product[]>(this.uri_product);
  }

  getProductbyId(idProduct: string) {
    return this.httpClient.get<Product>(`${this.uri_product}${idProduct}`);
  }

  addProduct(newProduct: ProductDTO) {
    return this.httpClient.post<Product>(this.uri_product, newProduct);
  }

  updateProduct(idProduct: string, product: UpdateProductDTO) {
    return this.httpClient.put<Product>(
      `${this.uri_product}${idProduct}`,
      product
    );
  }

  deleteProduct(idProduct: string) {
    return this.httpClient.delete(`${this.uri_product}${idProduct}`);
  }
}
