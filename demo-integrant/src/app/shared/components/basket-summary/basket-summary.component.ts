import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBasketItem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html'
})
export class BasketSummaryComponent implements OnInit {

  @Input() isBasket = true;

  @Input() basketProducts: IBasketItem[];


  @Output() decrement: EventEmitter<number> = new EventEmitter<number>();
  @Output() increment: EventEmitter<number> = new EventEmitter<number>();
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.basketProducts)
  }

  decrementItemQuantity(basketItemId: number) {
    this.decrement.emit(basketItemId);
  }

  incrementItemQuantity(basketItemId: number) {
    this.increment.emit(basketItemId);
  }

  removeBasketItem(basketItemId: number) {
    this.remove.emit(basketItemId);
  }

}
