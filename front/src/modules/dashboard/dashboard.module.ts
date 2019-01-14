import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routing';
import {SharedModule} from '../shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HeaderComponent} from './header/header.component';
import {CategoriesListComponent} from './categoriesList/categoriesList.component';
import {AddCategoryComponent} from './addCategory/addCategory.component';
import {CategoryComponent} from './category/category.component';
import {AddPaymentComponent} from './addPayment/addPayment.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    CategoryComponent,
    AddPaymentComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MatSidenavModule
  ],
  providers: [
  ],
  bootstrap: [DashboardComponent],
  entryComponents: [
    AddCategoryComponent,
    AddPaymentComponent
  ]
})
export class DashboardModule { }
