import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DIALOG_ADD_NEW_CATEGORY, DIALOG_ADD_NEW_PAYMENT, DialogAddNewCategory, DialogAddNewPayment} from '../../actions/dialog.actions';
import {select, Store} from '@ngrx/store';
import {dataStateSelector, IState} from '../../reducers/index';
import {MatDialog} from '@angular/material';
import {AddCategoryComponent} from '../../../components/addCategory/addCategory.component';
import {AddCategory, PaymentToSelectedCategory} from '../../actions/data.actions';
import {currencies} from '../../../constants';
import {AddPaymentComponent} from '../../../components/addPayment/addPayment.component';
import {take, switchMap, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Injectable()
export class DialogEffects {
  @Effect() dialogOpenModalCategoryStream;
  @Effect() dialogOpenModalPaymentStream;

  constructor(private actionsStream: Actions, private store: Store<IState>, public dialog: MatDialog) {

    this.dialogOpenModalCategoryStream = actionsStream.pipe(
      ofType<DialogAddNewCategory>(DIALOG_ADD_NEW_CATEGORY),
      switchMap(() => {
         const dialogRef = this.dialog.open(AddCategoryComponent, {
          width: '300px',
          data: {
            name: null,
            percent: null,
            description: null,
            title: 'Add New Category'
          }
        });

        return dialogRef.afterClosed()
          .pipe(
            take(1),
            filter(data => !!data),
            map(({name, description, percent}) => new AddCategory(name, percent, description)),
          );
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
      switchMap(({selectedCategory}) => {
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

        return dialogRef.afterClosed()
          .pipe(
            take(1),
            filter(data => !!data),
            map(({amount, currency, description}) => new PaymentToSelectedCategory(selectedCategory._id , amount, currency, description))
          );
      }),
    );
  }
}
