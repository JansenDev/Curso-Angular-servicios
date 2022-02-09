import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
