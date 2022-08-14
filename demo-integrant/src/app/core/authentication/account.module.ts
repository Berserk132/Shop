import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './authentication-routing.module';
import { StoreModule } from '@ngrx/store';
import { authenticationReducer } from './state/authentication.reducer';




@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    StoreModule.forFeature('authentication', authenticationReducer),
    MatIconModule,
  ],

  exports: [
    LoginComponent
  ]
})
export class AccountModule { }
