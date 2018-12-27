import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register.routing';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
  ],
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
