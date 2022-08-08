import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    BasketComponent,
    
  ],
  imports: [
    SharedModule,
    BasketRoutingModule,
    CommonModule,
  ],
  exports: [
    BasketComponent
  ]
})
export class BasketModule { }
