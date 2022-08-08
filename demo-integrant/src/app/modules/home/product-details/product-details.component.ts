import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../../core/services/home.service';
import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../core/services/basket.service';
import { IProduct } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  counter: number = 1;
  currentProduct: IProduct;
  constructor(private homeService: HomeService, private basketService: BasketService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentProduct = this.homeService.products.find((item, index) => item.Id == params['id']) as IProduct
    });
  }

  decrement() {
    if (this.counter > 1) {

      this.counter--;
    }
  }

  increment() {

    this.counter++;
  }


  AddToBasket(quantityIput: HTMLInputElement) {
    this.route.params.subscribe(params => {

      let product = this.homeService.products.find((item, index) => item.Id == params['id'])
      let quantity = parseInt(quantityIput.value)
      this.basketService.AddToBasket(product as IProduct, quantity);
    });
  }

}
