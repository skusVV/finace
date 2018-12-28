import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routing';
import {SharedModule} from '../shared.module';
import {InitialFormComponent} from './initial-form/initial-form.component';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  declarations: [
    DashboardComponent,
    InitialFormComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MatStepperModule
  ],
  providers: [
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
