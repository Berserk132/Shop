import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'

import { CdkStepperModule } from '@angular/cdk/stepper';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    BasketSummaryComponent,
    OrderTotalsComponent,
    FilterModalComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
  ],
  exports: [
    PaginationModule,
    ReactiveFormsModule,
    BsDropdownModule,
    ReactiveFormsModule,
    CdkStepperModule,
    BasketSummaryComponent,
    OrderTotalsComponent,
    FilterModalComponent,

  ]
})
export class SharedModule { }
