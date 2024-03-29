import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// modules addded
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { ReversePipe } from './pipe/reverse.pipe';
import { TimeAgoPipe } from './pipe/time-ago.pipe';
import { VowelToNumberPipe } from './pipe/vowel-to-number.pipe';
import { HighlightDirective } from './directive/highlight.directive';
import { SwiperModule } from 'swiper/angular';

import { TokenInterceptor } from './interceptor/token.interceptor';
import { TimeInterceptor } from './interceptor/time.interceptor';

@NgModule({
  // ^Componentes, pipes, servicios y directivas
  declarations: [
    AppComponent,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    VowelToNumberPipe,
    HighlightDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SwiperModule,
  ],
  // ^Aqui se agrega los interceptores de requests
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
