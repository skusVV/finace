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
  LOAD_PAYMENTS, PaymentsLoadSuccess, LoadCurrencyExchange, LOAD_CURRENCY_EXCHANGE, LoadCurrencyExchangeSuccess
} from '../actions/data.actions';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DataEffects {
  @Effect() loadCategoriesStream: Observable<CategoriesLoadSuccess>;
  @Effect() loadPaymentsStream: Observable<PaymentsLoadSuccess>;
  @Effect() loadCurrencyExchange: Observable<LoadCurrencyExchangeSuccess>;
  @Effect() addCategoryStream: Observable<AddCategorySuccess>;
  @Effect() addPaymentStream: Observable<PaymentToSelectedCategorySuccess>;

  constructor(private actionsStream: Actions,
              private http: HttpClient) {
    this.loadCategoriesStream = actionsStream.pipe(
      ofType<LoadCategories>(LOAD_CATEGORIES),
      switchMap(() =>
        this.http.get(`/api/v1/categories`),
      ),
      // TODO add catch Error handler
      map(categories => new CategoriesLoadSuccess(categories)),
    );

    this.addCategoryStream = actionsStream.pipe(
      ofType<AddCategory>(ADD_CATEGORY),
      switchMap(({payload}) =>
        this.http.post(`/api/v1/categories`, payload),
      ),
      // TODO add catch Error handler
      map(category => new AddCategorySuccess(category)),
    );

    this.addPaymentStream = actionsStream.pipe(
      ofType<PaymentToSelectedCategory>(PAYMENT_TO_SELECTED_CATEGORY),
      switchMap(({payload}) =>
        this.http.post(`/api/v1/payments`, payload),
      ),
      // TODO add catch Error handler
      map(payment => new PaymentToSelectedCategorySuccess(payment)),
    );

    this.loadPaymentsStream = actionsStream.pipe(
      ofType<LoadPayments>(LOAD_PAYMENTS),
      switchMap(() =>
        this.http.get(`/api/v1/payments`),
      ),
      // TODO add catch Error handler
      map(payments => new PaymentsLoadSuccess(payments)),
    );


    this.loadCurrencyExchange = actionsStream.pipe(
      ofType<LoadCurrencyExchange>(LOAD_CURRENCY_EXCHANGE),
      switchMap(() =>
        this.http.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`),
      ),
      // TODO add catch Error handler
      map(currencyExchange => new LoadCurrencyExchangeSuccess(currencyExchange)),
    );
  }
}
