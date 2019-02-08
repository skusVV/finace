import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
import {
  PaymentToSelectedCategory,
  PAYMENT_TO_SELECTED_CATEGORY,
  PaymentToSelectedCategorySuccess,
  DeletePayment,
  DELETE_PAYMENT,
  DeletePaymentSuccess,
} from '../../actions/data.actions';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class PaymentsEffects {
  @Effect() addPaymentStream: Observable<PaymentToSelectedCategorySuccess>;
  @Effect() deletePaymentStream: Observable<DeletePaymentSuccess>;

  constructor(private actionsStream: Actions,
              private http: HttpClient) {
    this.addPaymentStream = actionsStream.pipe(
      ofType<PaymentToSelectedCategory>(PAYMENT_TO_SELECTED_CATEGORY),
      switchMap(({payload}) =>
        this.http.post(`/api/v1/payments`, payload),
      ),
      // TODO add catch Error handler
      map(payment => new PaymentToSelectedCategorySuccess(payment)),
    );

    this.deletePaymentStream = actionsStream.pipe(
      ofType<DeletePayment>(DELETE_PAYMENT),
      switchMap(({payload: {paymentId}}) =>
        this.http.delete(`/api/v1/payments/${paymentId}`),
      ),
      // TODO add catch Error handler
      map((data: any) => new DeletePaymentSuccess(data.id)),
    );
  }
}
