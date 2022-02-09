import { Component } from '@angular/core';
import { Product } from './components/models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'componentes-servicios';
  user = 'Jhonatan';
  image = 'https://www.w3schools.com/howto/img_avatar.png';
  inParent = '';
  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: 'https://www.w3schools.com/howto/img_avatar2.png',
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: 'https://www.w3schools.com/howto/img_avatar.png',
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: 'https://www.w3schools.com/howto/img_avatar2.png',
    },
  ];

  onLoaded(data: string) {
    console.log('log Padre');
    console.log(data);
    this.inParent = data;
  }
}
