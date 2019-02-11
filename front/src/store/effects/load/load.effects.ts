import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
import {
  LOAD_CATEGORIES,
  LoadCategories,
  CategoriesLoadSuccess,
  LoadPayments,
  LOAD_PAYMENTS,
  PaymentsLoadSuccess,
  LoadCurrencyExchange,
  LOAD_CURRENCY_EXCHANGE,
  LoadCurrencyExchangeSuccess,
} from '../../actions/load.actions';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class LoadEffects {
  @Effect() loadCategoriesStream: Observable<CategoriesLoadSuccess>;
  @Effect() loadPaymentsStream: Observable<PaymentsLoadSuccess>;
  @Effect() loadCurrencyExchange: Observable<LoadCurrencyExchangeSuccess>;

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
        // TODO not sure about this api. EUR disappear from API
        this.http.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`),
      ),
      // TODO add catch Error handler
      map(currencyExchange => new LoadCurrencyExchangeSuccess(currencyExchange)),
    );
  }
}
