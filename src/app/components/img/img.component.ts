import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent implements OnInit {
  @Input()
  image = '';
  @Input()
  user: string = '';
  @Output()
  loaded = new EventEmitter<string>();
  out = '';
  imageDefault = 'https://www.m2crowd.com/core/i/placeholder.png';

  constructor() {}

  ngOnInit(): void {}

  imgError() {
    console.log('error al cargar la imagen');
    this.image = this.imageDefault;
  }

  onLoaded() {
    console.log('Log Hijo');
    this.loaded.emit(this.image);
  }
}
