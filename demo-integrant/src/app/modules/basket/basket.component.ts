import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/core/services/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketProducts: IBasketItem[];

  constructor(private basketService: BasketService) {
  };

  ngOnInit(): void {
    this.basketProducts = this.basketService.LoadBasket();
  };


  removeBasketItem(basketItemId: number) {
    this.basketService.RemoveFromBasket(basketItemId);
    console.log('2')
    this.basketProducts = this.basketService.LoadBasket();
    console.log(this.basketProducts, basketItemId)
  }

  incrementItemQuantity(basketItemId: number) {
    this.basketService.IncrementBasketItem(basketItemId);
    this.basketProducts = this.basketService.LoadBasket();
  }

  decrementItemQuantity(basketItemId: number) {
    this.basketService.DecrementBasketItem(basketItemId);
    this.basketProducts = this.basketService.LoadBasket();
  }

}
