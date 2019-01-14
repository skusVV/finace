import {Component, OnDestroy, OnInit} from '@angular/core';
import {IState, userStateSelector, dataStateSelector} from '../../store/reducers';
import {Store, select} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, take, switchMap, filter, tap, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ICategory, IPayment} from '../../store/reducers/data.reducer';
import {AddCategoryComponent} from './addCategory/addCategory.component';
import {AddCategory, PaymentToSelectedCategory, SelectCategory} from '../../store/actions/data.actions';
import {currencies} from '../../constants';
import {AddPaymentComponent} from './addPayment/addPayment.component';

export interface ICategoryDialog {
  name: string;
  percent: number;
  description: string;
  title: string;
}

export type ICurrency = 'USD' | 'UAH' | 'EUR';

export interface IPaymentDialog {
  amount: string;
  currency: ICurrency;
  availableCurrencies: string[];
  description: string;
  title: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userName: Observable<string>;
  sidebarOpened = true;
  categories: Observable<ICategory[]>;
  payments: IPayment[] = [];
  selectedCategory: any;

  private destroyStream = new Subject<void>();

  constructor(private store: Store<IState>, public dialog: MatDialog) {}

  ngOnInit() {
    this.userName =  this.store.pipe(
      distinctUntilChanged(),
      select(userStateSelector),
      map(({userName}) => userName)
    );

    const dataStateStream = this.store.pipe(
      distinctUntilChanged(),
      select(dataStateSelector),
    );

    this.categories = dataStateStream.pipe(
      map(({categories}) => categories)
    );

    dataStateStream.pipe(
      takeUntil(this.destroyStream),
      map(({selectedCategory}) => selectedCategory),
      filter(selectedCategory => !!selectedCategory),
      tap(selectedCategory => {
        this.selectedCategory = selectedCategory;
      }),
      switchMap(() => dataStateStream.pipe(
        map(({payments}) => payments),
        filter(() => !!this.selectedCategory),
        map(payments => payments.filter(payment => payment.categoryId === this.selectedCategory._id)),
        tap(payments => {
          this.payments = payments;
        }),
      ))
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyStream.next();
    this.destroyStream.complete();
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  addNewCategory() {
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
  }

  selectCategory(id: string) {
    this.store.dispatch(new SelectCategory(id));
  }

  makePayment() {
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
        this.store.dispatch(new PaymentToSelectedCategory(this.selectedCategory._id , amount, currency, description));
      });
  }
}
