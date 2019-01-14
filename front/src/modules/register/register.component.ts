import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {IState} from '../../store/reducers/index'
import {RegisterUser} from '../../store/actions/user.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    userName: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
    promoCode: new FormControl(''),
  });

  constructor(private store: Store<IState>){}

  register() {
    this.store.dispatch(new RegisterUser(this.formData));
  }

  private get formData() {
    return this.registerForm.getRawValue();
  }
}
