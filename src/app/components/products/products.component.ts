import { Component, OnInit } from '@angular/core';
import { Product, ProductDTO, UpdateProductDTO } from '../models/product.model';
import { StoreService } from '../../service/store.service';
import { ProductsService } from '../../service/products.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  limit = 5;
  offset = this.limit;

  ngOnInit(): void {
    this.productsService
      .getAllProducts(this.limit, this.offset)
      .subscribe((data) => {
        this.products = data;
      });
  }
  products: Product[] = [];
  shoppingCart: Product[] = [];
  priceTotal_cart = 0;
  showProductDetail = false;
  productSelected: Product = {
    category: 'test category',
    image: 'https://i.pravatar.cc',
    price: 0,
    description: 'test description',
    title: 'test title',
  } as Product;

  private createProductDTO: ProductDTO = {
    title: 'Nuevo Producto',
    description: 'Nueva description',
    price: 1000,
    image: 'https://i.pravatar.cc',
    category: 'new category',
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';



  addProduct_cart(product: Product) {
    this.storeService.addProduct_cart(product);
    this.priceTotal_cart = this.storeService.totalPrice_cart();
  }

  btnToogleShowProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  getProductDetail(idProduct: string) {
    this.productsService.getProductbyId(idProduct).subscribe({
      next: (product) => this.getProductDetail_ok(product),
      error: (err: HttpErrorResponse) => this.getProductDetail_error(err),
    });
  }

  getProductDetail_ok(productFounded: Product) {
    this.showProductDetail = true;
    this.productSelected = productFounded;
  }

  getProductDetail_error(errorResponse: HttpErrorResponse) {
    console.log(errorResponse.message);
    this.statusDetail = 'error';
  }

  onAddNewProduct() {
    console.log('Nuevo producto agregado');
    this.productsService
      .addProduct(this.createProductDTO)
      .subscribe((product: Product) => {
        console.log(product);
        this.products.unshift(product);
      });
  }

  onUpdateNewProduct() {
    console.log('Producto editado');
    const id: string = this.productSelected.id!;
    // Es lo mismo como !, Le dice a TypeScript que, aunque parezca que algo podría ser nulo, puede confiar en que no lo es:
    // const id:string | string = this.updateProductDTO.id || ""
    const changes: UpdateProductDTO = {
      title: 'Producto editado',
      price: 10,
      image: 'https://i.pravatar.cc',
    };

    this.productsService
      .updateProduct(id, changes)
      .subscribe((product: Product) => {
        const productIndex = this.products.findIndex(
          (product) => product.id === id
        );

        this.products[productIndex] = product;
      });
  }

  onDeleteProduct() {
    const id = this.productSelected.id;

    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    this.productsService.deleteProduct(id).subscribe((dataResult) => {
      this.products.splice(productIndex, 1);
    });
    this.showProductDetail = false;
  }

  onLoadMore() {
    this.productsService
      .getProductByParams(this.limit, this.offset)
      .subscribe((products: Product[]) => {
        console.log(products);
        this.limit += 5;
        this.products = this.products.concat(products);
      });
  }
}
