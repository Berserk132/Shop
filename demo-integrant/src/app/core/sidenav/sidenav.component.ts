import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }


  GetBasketLength() {

    return this.basketService.LoadBasket().length;
  }
}
