import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login.routing';
import {SharedModule} from '../shared.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
