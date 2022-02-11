import { Component } from '@angular/core';
import { StoreService } from '../../service/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  activeMenu = false;
  cartTotal = 0;

  constructor(private storeService: StoreService) {
    this.storeService.cart$.subscribe((shoppingsCartProduct) => {
      this.cartTotal = shoppingsCartProduct.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
