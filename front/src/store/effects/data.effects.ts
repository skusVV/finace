import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
import {combineLatest} from "rxjs";
import {
  InitialData,
  DATA_INITIAL,
  DataLoadedSuccess,
  LOAD_CATEGORIES,
  LoadCategories,
  CategoriesLoadSuccess
} from '../actions/data.actions';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataEffects {
  @Effect() userInitialPaymentStream;
  @Effect() categoriesStream;

  constructor(private actionsStream: Actions,
              private http: HttpClient) {
    this.userInitialPaymentStream = actionsStream.pipe(
      ofType<InitialData>(DATA_INITIAL),
      switchMap(({payload: {payment, categories}}) =>
          combineLatest(this.initialPaymentRequest(payment), this.initialCategoriesRequest(categories))
      ),
      map(([payments, categories]) => new DataLoadedSuccess([payments], categories))
    );

    this.categoriesStream = actionsStream.pipe(
      ofType<LoadCategories>(LOAD_CATEGORIES),
      switchMap(() =>
        this.http.get(`/api/v1/categories`),
      ),
      map(categories => new CategoriesLoadSuccess(categories)),
    );
  }


  private initialPaymentRequest(amount: number) {
    return this.http.post<any>(`/api/v1/payments`, {amount});
  }

  private initialCategoriesRequest(categories: number) {
    return this.http.post<any>(`/api/v1/categories`, {categories});
  }
}
