import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/core/services/basket.service';


@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  basketTotals: number;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketTotals = 2000;
  }

}
