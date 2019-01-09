import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routing';
import {SharedModule} from '../shared.module';
// import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    // MatStepperModule,
    MatSidenavModule
  ],
  providers: [
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
