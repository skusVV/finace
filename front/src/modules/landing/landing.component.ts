import {Component} from '@angular/core';
import {IState} from '../../store/reducers';
import {Store} from '@ngrx/store';
import {RedirectTo} from '../../store/actions/router.actions';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent {
  constructor(private store: Store<IState>) {}

  goTo(path: string) {
    this.store.dispatch(new RedirectTo([path]));
  }
}
