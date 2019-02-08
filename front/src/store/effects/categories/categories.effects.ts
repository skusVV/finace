import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
import {
  AddCategory,
  ADD_CATEGORY,
  AddCategorySuccess,
  DeleteCategorySuccess,
  DELETE_CATEGORY,
  DeleteCategory,
} from '../../actions/data.actions';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CategoriesEffects {
  @Effect() addCategoryStream: Observable<AddCategorySuccess>;
  @Effect() deleteCategoryStream: Observable<DeleteCategorySuccess>;

  constructor(private actionsStream: Actions,
              private http: HttpClient) {
    this.addCategoryStream = actionsStream.pipe(
      ofType<AddCategory>(ADD_CATEGORY),
      switchMap(({payload}) =>
        this.http.post(`/api/v1/categories`, payload),
      ),
      // TODO add catch Error handler
      map(category => new AddCategorySuccess(category)),
    );

    this.deleteCategoryStream = actionsStream.pipe(
      ofType<DeleteCategory>(DELETE_CATEGORY),
      switchMap(({payload: {categoryId}}) =>
        this.http.delete(`/api/v1/categories/${categoryId}`),
      ),
      // TODO add catch Error handler
      map((data: any) => new DeleteCategorySuccess(data.id)),
    );
  }
}
