import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DIALOG_ADD_NEW_CATEGORY, DIALOG_ADD_NEW_PAYMENT, DialogAddNewCategory, DialogAddNewPayment} from '../actions/dialog.actions';
import {select, Store} from '@ngrx/store';
import {dataStateSelector, IState} from '../reducers';
import {MatDialog} from '@angular/material';
import {AddCategoryComponent} from '../../modules/dashboard/addCategory/addCategory.component';
import {AddCategory, PaymentToSelectedCategory} from '../actions/data.actions';
import {currencies} from '../../constants';
import {AddPaymentComponent} from '../../modules/dashboard/addPayment/addPayment.component';
import {tap, take, switchMap, distinctUntilChanged} from 'rxjs/operators';

@Injectable()
export class DialogEffects {
  @Effect({dispatch: false}) dialogOpenModalCategoryStream;
  @Effect({dispatch: false}) dialogOpenModalPaymentStream;

  constructor(private actionsStream: Actions, private store: Store<IState>, public dialog: MatDialog) {

    this.dialogOpenModalCategoryStream = actionsStream.pipe(
      ofType<DialogAddNewCategory>(DIALOG_ADD_NEW_CATEGORY),
      tap(() => {
         const dialogRef = this.dialog.open(AddCategoryComponent, {
          width: '300px',
          data: {
            name: null,
            percent: null,
            description: null,
            title: 'Add New Category'
          }
        });

        dialogRef.afterClosed()
          .pipe(
            take(1),
          )
          .subscribe(({name, description, percent}) => {
            this.store.dispatch(new AddCategory(name, percent, description));
          });
      }),
    );

    this.dialogOpenModalPaymentStream = actionsStream.pipe(
      ofType<DialogAddNewPayment>(DIALOG_ADD_NEW_PAYMENT),
      switchMap(() => this.store.pipe(
          distinctUntilChanged(),
          select(dataStateSelector),
          take(1),
        )
      ),
      tap(({selectedCategory}) => {
        const dialogRef = this.dialog.open(AddPaymentComponent, {
          width: '300px',
          data: {
            amount: null,
            currency: null,
            availableCurrencies: currencies,
            description: null,
            title: 'Make Payment'
          }
        });

        dialogRef.afterClosed()
          .pipe(
            take(1),
          )
          .subscribe(({amount, currency, description}) => {
            this.store.dispatch(new PaymentToSelectedCategory(selectedCategory._id , amount, currency, description));
          });
      }),
    );
  }
}
