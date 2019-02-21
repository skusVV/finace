import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../services/guards/auth.guard';
import {DashboardResolver} from '../services/dashboard.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../modules/landing/landing.module#LandingModule',
  },
  {
    path: 'dashboard',
    loadChildren: '../modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard],
    resolve: { data: DashboardResolver }
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
    path: 'register/',
    redirectTo: 'register',
  },
  {
    path: 'register',
    loadChildren: '../modules/register/register.module#RegisterModule',
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
