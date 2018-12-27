import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Store} from '@ngrx/store';
import {IState} from '../../store/reducers/index'
import {LoginUser} from '../../store/reducers/user/user.actions';
import {RedirectTo} from '../../store/reducers/router/router.actions';

const ROUTE_REGISTER = 'register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private store: Store<IState>){}

  login() {
    this.store.dispatch(new LoginUser(this.formData));
  }

  register() {
    this.store.dispatch(new RedirectTo([ROUTE_REGISTER]));
  }

  private get formData() {
    return this.loginForm.getRawValue();
  }
}
