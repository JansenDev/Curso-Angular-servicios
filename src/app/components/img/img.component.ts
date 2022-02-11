import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  @Input()
  image = '';
  @Input()
  user: string = '';
  @Output()
  loaded = new EventEmitter<string>();
  out = '';
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';

  constructor() {}


  imgError() {
    console.log('error al cargar la imagen');
    this.image = this.imageDefault;
  }

  onLoaded() {
    this.loaded.emit(this.image);
  }
}
