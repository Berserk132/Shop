
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from 'src/app/shared/models/Filter';
import { IProduct } from 'src/app/shared/models/Product';
import * as data from 'src/app/shared/data/products.json'


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  products: IProduct[] = data['default'];

  constructor(private http: HttpClient) {
    console.log(this.products)
  }


  FilterData(prods: IProduct[], filterParams: Filter) {

    prods = this.products.filter((item, index) => item.Price >= filterParams.MinValue && item.Price <= filterParams.MaxValue)
    return prods;
  }

}
