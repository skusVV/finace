import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
// import {combineLatest} from "rxjs";
import {
  // InitialData,
  // DATA_INITIAL,
  // DataLoadedSuccess,
  LOAD_CATEGORIES,
  LoadCategories,
  CategoriesLoadSuccess, AddCategory, ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  AddCategorySuccess
} from '../actions/data.actions';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataEffects {
  @Effect() categoriesStream;
  @Effect() addCategory;

  constructor(private actionsStream: Actions,
              private http: HttpClient) {
    this.categoriesStream = actionsStream.pipe(
      ofType<LoadCategories>(LOAD_CATEGORIES),
      switchMap(() =>
        this.http.get(`/api/v1/categories`),
      ),
      map(categories => new CategoriesLoadSuccess(categories)),
    );

    this.addCategory = actionsStream.pipe(
      ofType<AddCategory>(ADD_CATEGORY),
      switchMap(({payload}) =>
        this.http.post(`/api/v1/categories`, payload),
      ),
      map(category => new AddCategorySuccess(category)),
    );
  }


  // private initialPaymentRequest(amount: number) {
  //   return this.http.post<any>(`/api/v1/payments`, {amount});
  // }
  //
  // private initialCategoriesRequest(categories: number) {
  //   return this.http.post<any>(`/api/v1/categories`, {categories});
  // }
}
