import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {IState} from '../reducers';
import {tap, switchMap, merge} from 'rxjs/operators';
import { combineLatest } from "rxjs";
import {InitialData, USER_INITIAL_DATA} from '../actions/payment.actions'
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PaymentEffects {
  @Effect({dispatch: false}) userInitialPaymentStream;

  constructor(private actionsStream: Actions,
              private http: HttpClient,
              private store: Store<IState>) {
    this.userInitialPaymentStream = actionsStream.pipe(
      ofType<InitialData>(USER_INITIAL_DATA),
      switchMap(({payload: {payment, categories}}) =>
          combineLatest(this.initialPaymentRequest(payment), this.initialCategoriesRequest(categories))
      ),
      tap(data => console.log(data))
    );
  }


  private initialPaymentRequest(amount: number) {
    return this.http.post<any>(`/api/v1/payments`, {amount})
  }

  private initialCategoriesRequest(categories: number) {
    return this.http.post<any>(`/api/v1/categories`, {categories})
  }
}
