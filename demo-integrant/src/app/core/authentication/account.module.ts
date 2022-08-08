import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './authentication-routing.module';




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
    MatIconModule,
  ],

  exports: [
    LoginComponent
  ]
})
export class AccountModule { }
