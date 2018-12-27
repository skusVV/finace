import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../services/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'login/',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: '../modules/login/login.module#LoginModule',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
