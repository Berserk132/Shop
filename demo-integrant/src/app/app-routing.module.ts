import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/mainLayout/MainLayout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'shop', component: MainLayoutComponent, children: [

      {
        path: 'cart', loadChildren: () => import('./modules/basket/basket.module')
          .then(mod => mod.BasketModule), data: { breadcrumb: { skip: true } }
      },
      {
        path: '', loadChildren: () => import('./modules/home/home.module')
          .then(mod => mod.HomeModule), data: { breadcrumb: { skip: true } }
      },

    ]
  },
  {
    path: 'login',
    loadChildren: () => import("./core/authentication/account.module")
      .then(mod => mod.AccountModule), data: { breadcrumb: { skip: true } }
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
