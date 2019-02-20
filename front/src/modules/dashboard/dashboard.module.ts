import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routing';
import {SharedModule} from '../shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HeaderComponent} from './header/header.component';
import {CategoriesListComponent} from './categoriesList/categoriesList.component';
import {CategoryComponent} from './category/category.component';
import {PaymentListComponent} from './paymentList/paymentList.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    CategoriesListComponent,
    CategoryComponent,
    PaymentListComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MatSidenavModule,
  ],
  providers: [
  ],
  bootstrap: [DashboardComponent],
})
export class DashboardModule { }
