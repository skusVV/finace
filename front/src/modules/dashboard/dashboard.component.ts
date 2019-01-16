import {Component, OnInit} from '@angular/core';
import {IState, userStateSelector, dataStateSelector} from '../../store/reducers';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map, switchMap, filter} from 'rxjs/operators';
import {ICategory, ICurrencyExchange, IPayment} from '../../store/reducers/data.reducer';
import {SelectCategory} from '../../store/actions/data.actions';
import {DialogAddNewCategory, DialogAddNewPayment} from '../../store/actions/dialog.actions';

export type ICurrency = 'USD' | 'UAH' | 'EUR';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  userName: Observable<string>;
  sidebarOpened = true;
  categories: Observable<ICategory[]>;
  currencyExchange: Observable<ICurrencyExchange[]>;
  payments: Observable<IPayment[]>;
  selectedCategory: Observable<ICategory>;

  constructor(private store: Store<IState>) {}

  ngOnInit() {
    this.userName = this.store.pipe(
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

    this.currencyExchange = dataStateStream.pipe(
      map(({currencyExchange}) => currencyExchange)
    );

    this.selectedCategory = dataStateStream.pipe(
      map(({selectedCategory}) => selectedCategory),
    );

    this.payments = dataStateStream.pipe(
      map(({selectedCategory}) => selectedCategory),
      filter(selectedCategory => !!selectedCategory),
      switchMap(selectedCategory => dataStateStream.pipe(
        map(({payments}) => payments.filter(payment => payment.categoryId === selectedCategory._id)),
      ))
    );
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  selectCategory(id: string) {
    this.store.dispatch(new SelectCategory(id));
  }

  selectPayment(payment: IPayment) {
    console.log(1, payment);
  }

  addNewCategory() {
    this.store.dispatch(new DialogAddNewCategory());
  }

  makePayment() {
    this.store.dispatch(new DialogAddNewPayment());
  }
}
