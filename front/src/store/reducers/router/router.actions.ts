import {Action} from '@ngrx/store';
import {Params, NavigationExtras} from '@angular/router';
// import {RouteGroup} from '../modules/app/routerGroup';

// export const ROUTER_REDIRECT = '[Router] Redirect';
export const ROUTER_REDIRECT_TO = '[Router] Redirect To';
// export const ROUTER_CHANGE = '[Router] Change';

// export class Redirect implements Action {
//   readonly type = ROUTER_REDIRECT;
//   readonly payload: {path: string, extras?: NavigationExtras};
//
//   constructor(path: string, extras?: NavigationExtras) {
//     this.payload = {path, extras};
//   }
// }

export class RedirectTo implements Action {
  readonly type = ROUTER_REDIRECT_TO;
  readonly payload: {path: string[], extras?: NavigationExtras};

  constructor(path: string[], extras?: NavigationExtras) {
    this.payload = {path, extras};
  }
}
//
// export class RouteChanged implements Action {
//   readonly type = ROUTER_CHANGE;
//   readonly payload: {routeGroup: RouteGroup, params: Params};
//
//   constructor(routeGroup: RouteGroup, params: Params = {}) {
//     this.payload = {routeGroup, params};
//   }
// }
