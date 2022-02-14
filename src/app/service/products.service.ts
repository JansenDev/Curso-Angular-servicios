import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import {
  Product,
  ProductDTO,
  UpdateProductDTO,
} from '../components/models/product.model';
import { catchError, map } from 'rxjs/operators';
import { throwError, switchMap, zip } from 'rxjs';

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
    return this.httpClient.get<Product[]>(this.uri_product, { params }).pipe(
      map((products) =>
        products.map((item) => {
          return { ...item, taxes: 0.19 * item.price };
        })
      )
    );
  }

  getProductbyId(idProduct: string) {
    return this.httpClient.get<Product>(`${this.uri_product}${idProduct}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status == HttpStatusCode.BadRequest) {
          return throwError(() => new Error('Bad parameters'));
        }
        if (error.status == HttpStatusCode.NotFound) {
          return throwError(() => new Error('Product not found'));
        }
        if (error.status == 401) {
          return throwError(() => new Error('Unauthorized'));
        }
        return throwError(() => new Error(error.message));
      })
    );
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

  // ^PARA HACER CONSULTAS SUCESIVAS
  readAndUpdate(id: string) {
    return (
      this.getProductbyId(id)
        .pipe(
          // *Intercepta el subscribe de salida para hacer un update al producto | evitando asi el callback hell
          switchMap((product) =>
            this.updateProduct(product.id, {
              title: 'changed title',
            })
          )
        )
        // *Esto lo hace el usuario
        .subscribe((productUpdated) => {
          //^ Callback hell evitado
          console.log(productUpdated);
        })
    );

    // ^callback hell de consultas que dependan de otras sucesivamente
    // .subscribe((product) => {
    //   this.productsService
    //     .updateProduct(product.id, { title: 'change' })
    //     .subscribe((respuesta) => {
    //       console.log(respuesta);
    //     });
    // });
  }

  // ^PARA HACER CONSULTAS EN PARALELO(IGUAL A Promise.All())
  readAndUpdateInParallel(id: string) {
    return (
      zip(
        this.getProductbyId(id),
        this.updateProduct(id, {
          title: 'changed title',
        })
      )
        // *Esto lo hace el usuario
        .subscribe((zipResultList) => {
          const readDataResult = zipResultList[0];
          const updateDataResult = zipResultList[1];
          console.log(zipResultList);
        })
    );
  }
}
