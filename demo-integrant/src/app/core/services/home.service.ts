
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from 'src/app/shared/models/Filter';
import { IProduct } from 'src/app/shared/models/Product';
import { BehaviorSubject, map, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public products = new BehaviorSubject<IProduct[]>(null)
  public products$ = this.products.asObservable();

  constructor(private http: HttpClient) {
    this.getProducts();
  }


  FilterData(filterParams: Filter = {MinValue: 0, MaxValue: 10000}) {


    this.products$.pipe(
      take(1)
    ).subscribe({
      next: (products) => {
          let prods = products.filter((item, index) => item.Price >= filterParams.MinValue && item.Price <= filterParams.MaxValue);
          this.products.next(prods);
      }
    })
  }


  getProducts() {
    
    console.log('calling API')
    this.http.get('http://localhost:3000/products')
      .subscribe((res: IProduct[]) => {
        this.products.next(res)
        console.log(res)
      }) 
  }
}
