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
  DeleteCategory,
  DeleteCategoryCancel, OPEN_VISUALIZE_CATEGORY, OpenVisualizeCategory, SelectCategory, SELECT_CATEGORY,
} from '../../actions/category.actions';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ConfirmComponent} from '../../../components/confirm/confirm.component';
import {select, Store} from '@ngrx/store';
import {dataStateSelector, IState} from '../../reducers';
import {CategoryVisualizeComponent} from '../../../components/categoryVisualize/categoryVisualize.component';
import {RedirectTo} from '../../actions/router.actions';
import {isMobile} from 'is-mobile';

@Injectable()
export class CategoriesEffects {
  @Effect() addCategoryStream: Observable<AddCategorySuccess>;
  @Effect() selectCategoryStream: Observable<RedirectTo>;
  @Effect() deleteCategoryStream: Observable<DeleteCategorySuccess | DeleteCategoryCancel>;
  @Effect({dispatch: false}) openVisualizeCategoryStream: Observable<any>;

  constructor(private actionsStream: Actions,
              public dialog: MatDialog,
              private store: Store<IState>,
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

    this.openVisualizeCategoryStream = actionsStream.pipe(
      ofType<OpenVisualizeCategory>(OPEN_VISUALIZE_CATEGORY),
      switchMap(() => this.store.pipe(
        select(dataStateSelector),
        map(({payments, selectedCategory}) => {
          return {
            title: selectedCategory.name,
            payments: payments.filter(payment => payment.categoryId === selectedCategory._id),
          }
        }),
        take(1),
      )),
      switchMap(({title, payments}) => {
        const dialogRef = this.dialog.open(CategoryVisualizeComponent, {
          width: isMobile() ? '100vw' : '80vw',
          maxWidth: '100vw',
          height: isMobile() ? '100vh' :'95vh',
          data: {
            title,
            payments,
          }
        });

        return dialogRef.afterClosed();
      })
    );

    this.selectCategoryStream = actionsStream.pipe(
      ofType<SelectCategory>(SELECT_CATEGORY),
      switchMap(({payload: {categoryId}}) => {
        return of(new RedirectTo([`dashboard/category/${categoryId}`]))
      })
    );
  }
}
