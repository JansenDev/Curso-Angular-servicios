import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();

    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient.get<Product[]>(this.uri_product,{params});
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

  getProductByParams(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    console.log(params);

    return this.httpClient.get<Product[]>(this.uri_product, {
      params,
    });
  }
}
