import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, take} from 'rxjs/operators';
import {
  PaymentToSelectedCategory,
  PAYMENT_TO_SELECTED_CATEGORY,
  PaymentToSelectedCategorySuccess,
  DeletePaymentSuccess,
  DELETE_PAYMENT,
  DeletePayment,
  DeletePaymentCancel, UpdatePayment, UPDATE_PAYMENT, UpdatePaymentSucess, SELECT_PAYMENT, SelectPayment,
} from '../../actions/payment.actions';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ConfirmComponent} from '../../../components/confirm/confirm.component';
import {MatDialog} from '@angular/material';
import {SELECT_CATEGORY, SelectCategory} from '../../actions/category.actions';
import {RedirectTo} from '../../actions/router.actions';

@Injectable()
export class PaymentsEffects {
  @Effect() addPaymentStream: Observable<PaymentToSelectedCategorySuccess>;
  @Effect() updatePaymentStream: Observable<any>;
  @Effect() deletePaymentStream: Observable<DeletePaymentSuccess | DeletePaymentCancel>;
  @Effect() selectPaymentStream: Observable<RedirectTo>;


  constructor(private actionsStream: Actions,
              public dialog: MatDialog,
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
      switchMap(({payload: {paymentId}}) =>{
        const dialogRef = this.dialog.open(ConfirmComponent, {
          width: '300px',
          data: {
            title: 'Are you sure?',
            positiveButtonText: 'Ok',
            negativeButtonText: 'Cancel',
          }
        });

        return dialogRef.afterClosed()
          .pipe(
            take(1),
            switchMap(data => {
              return data
                ? this.http.delete(`/api/v1/payments/${paymentId}`).pipe(
                  map((data: any) => new DeletePaymentSuccess(data.id)),
                  // TODO add catch Error handler
                )
                : of(new DeletePaymentCancel())
            })
          );
      }),
    );

    this.updatePaymentStream = actionsStream.pipe(
      ofType<UpdatePayment>(UPDATE_PAYMENT),
      switchMap(({payload}) =>
        this.http.put(`/api/v1/payments/${payload._id}`, payload),
      ),
      // TODO add catch Error handler
      map(payment => new UpdatePaymentSucess(payment)),
    );

    this.selectPaymentStream = actionsStream.pipe(
      ofType<SelectPayment>(SELECT_PAYMENT),
      switchMap(({payload: {selectedPayment}}) => {

        return of(new RedirectTo([`payment/${selectedPayment._id}`]))
      })
    );
  }
}
