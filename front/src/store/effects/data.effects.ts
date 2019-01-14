import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
import {
  LOAD_CATEGORIES,
  LoadCategories,
  CategoriesLoadSuccess,
  AddCategory,
  ADD_CATEGORY,
  AddCategorySuccess,
  PaymentToSelectedCategory,
  PAYMENT_TO_SELECTED_CATEGORY,
  PaymentToSelectedCategorySuccess,
  LoadPayments,
  LOAD_PAYMENTS, PaymentsLoadSuccess
} from '../actions/data.actions';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataEffects {
  @Effect() loadCategoriesStream: any;
  @Effect() loadPaymentsStream: any;
  @Effect() addCategoryStream: any;
  @Effect() addPaymentStream: any;

  constructor(private actionsStream: Actions,
              private http: HttpClient) {
    this.loadCategoriesStream = actionsStream.pipe(
      ofType<LoadCategories>(LOAD_CATEGORIES),
      switchMap(() =>
        this.http.get(`/api/v1/categories`),
      ),
      map(categories => new CategoriesLoadSuccess(categories)),
    );

    this.addCategoryStream = actionsStream.pipe(
      ofType<AddCategory>(ADD_CATEGORY),
      switchMap(({payload}) =>
        this.http.post(`/api/v1/categories`, payload),
      ),
      map(category => new AddCategorySuccess(category)),
    );

    this.addPaymentStream = actionsStream.pipe(
      ofType<PaymentToSelectedCategory>(PAYMENT_TO_SELECTED_CATEGORY),
      switchMap(({payload}) =>
        this.http.post(`/api/v1/payments`, payload),
      ),
      map(payment => new PaymentToSelectedCategorySuccess(payment)),
    );

    this.loadPaymentsStream = actionsStream.pipe(
      ofType<LoadPayments>(LOAD_PAYMENTS),
      switchMap(() =>
        this.http.get(`/api/v1/payments`),
      ),
      map(payments => new PaymentsLoadSuccess(payments)),
    );
  }
}
