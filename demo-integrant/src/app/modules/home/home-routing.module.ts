import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: ':id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
