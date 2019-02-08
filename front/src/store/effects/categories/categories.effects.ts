import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, take} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  AddCategory,
  ADD_CATEGORY,
  AddCategorySuccess,
  DeleteCategorySuccess,
  DELETE_CATEGORY,
  DeleteCategory, DeleteCategoryCancel,
} from '../../actions/data.actions';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ConfirmComponent} from '../../../components/confirm/confirm.component';

@Injectable()
export class CategoriesEffects {
  @Effect() addCategoryStream: Observable<AddCategorySuccess>;
  @Effect() deleteCategoryStream: Observable<DeleteCategorySuccess | DeleteCategoryCancel>;

  constructor(private actionsStream: Actions,
              public dialog: MatDialog,
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
      switchMap(({payload: {categoryId}}) =>{
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
                ? this.http.delete(`/api/v1/categories/${categoryId}`).pipe(
                  map((data: any) => new DeleteCategorySuccess(data.id)),
                  // TODO add catch Error handler
                )
                : of(new DeleteCategoryCancel())
            })
          );
      }),
    );
  }
}
