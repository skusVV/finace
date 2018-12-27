import {Action} from '@ngrx/store';
import {NavigationExtras} from '@angular/router';

export const ROUTER_REDIRECT_TO = '[Router] Redirect To';

export class RedirectTo implements Action {
  readonly type = ROUTER_REDIRECT_TO;
  readonly payload: {path: string[], extras?: NavigationExtras};

  constructor(path: string[], extras?: NavigationExtras) {
    this.payload = {path, extras};
  }
}
