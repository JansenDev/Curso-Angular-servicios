import { Component } from '@angular/core';

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

  onLoaded(data:string) {
    console.log('log Padre');
    console.log(data);
    this.inParent = data
  }
}
