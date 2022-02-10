import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostListener('mouseenter')
  onMouseEnter() {
    this.elementRef.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.elementRef.nativeElement.style.backgroundColor = '';
  }
  // Si es una imagen
  @HostListener('error')
  onErrorImage(): void {
    this.elementImage.nativeElement.src ='https://www.m2crowd.com/core/i/placeholder.png';

  }

  constructor(private elementRef: ElementRef,
    private elementImage: ElementRef<HTMLImageElement>) {
    // this.elementRef.nativeElement.style.backgroundColor = 'red';
  }
}
