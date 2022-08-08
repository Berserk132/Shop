import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MainLayoutComponent } from './mainLayout/MainLayout.component';
import { AccountModule } from './authentication/account.module';



@NgModule({
    declarations: [
        HeaderComponent,
        MainLayoutComponent,
        SidenavComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        AccountModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatDialogModule,
        MatFormFieldModule,
    ],
    exports: [
        HeaderComponent,
        MainLayoutComponent,
        SidenavComponent,
        AccountModule

    ]
})
export class CoreModule { }
