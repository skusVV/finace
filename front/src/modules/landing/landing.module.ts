import {NgModule} from '@angular/core';
import {LandingComponent} from './landing.component';
import {LandingRoutingModule} from './landing.routing';
import {BlogComponent} from './blog/blog.component';
import {InfoComponent} from './info/info.component';
import {BlogItemComponent} from './blog/blogItem/blogItem.component';
import {SharedModule} from '../shared.module';

@NgModule({
  declarations: [
    LandingComponent,
    BlogComponent,
    BlogItemComponent,
    InfoComponent
  ],
  imports: [
    LandingRoutingModule,
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [LandingComponent],
})
export class LandingModule { }
