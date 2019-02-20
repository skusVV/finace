import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {CategoriesListComponent} from './categoriesList/categoriesList.component';
import {CategoryComponent} from './category/category.component';
import {PaymentComponent} from './payment/payment.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: CategoriesListComponent
      },
      {
        path: 'category/:id',
        component: CategoryComponent
      },
      {
        path: 'payment/:id',
        component: PaymentComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
