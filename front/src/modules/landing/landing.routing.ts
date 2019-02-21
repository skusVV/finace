import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from './landing.component';
import {BlogComponent} from './blog/blog.component';
import {InfoComponent} from './info/info.component';


export const landingRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: InfoComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(landingRoutes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {
}
