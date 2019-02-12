import {Component, OnInit} from '@angular/core';
import {IState, userStateSelector, dataStateSelector} from '../../store/reducers';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map, switchMap, filter} from 'rxjs/operators';
import {ICategory, ICurrencyExchange, IPayment} from '../../store/reducers/data.reducer';
import {DeleteCategory, OpenVisualizeCategory, SelectCategory} from '../../store/actions/category.actions';
import {DeletePayment, SelectPayment, UpdatePayment} from '../../store/actions/payment.actions';
import {DialogAddNewCategory, DialogAddNewPayment} from '../../store/actions/dialog.actions';
import {LogoutUser} from '../../store/actions/user.actions';

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
  selectedPayment: Observable<IPayment>;

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

    this.selectedPayment = dataStateStream.pipe(
      map(({selectedPayment}) => selectedPayment),
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

  selectPayment(payment: IPayment) {
    this.store.dispatch(new SelectPayment(payment));
  }

  addNewPayment() {
    this.store.dispatch(new DialogAddNewPayment());
  }

  onDeletePayment(id: string) {
    this.store.dispatch(new DeletePayment(id));
  }

  onUpdatePayment(payment: IPayment) {
    this.store.dispatch(new UpdatePayment(payment));
  }

  selectCategory(id: string) {
    this.store.dispatch(new SelectCategory(id));
  }

  addNewCategory() {
    this.store.dispatch(new DialogAddNewCategory());
  }

  onDeleteCategory(id: string) {
    this.store.dispatch(new DeleteCategory(id));
  }

  visualizeCategory() {
    this.store.dispatch(new OpenVisualizeCategory());
  }

  logout() {
    this.store.dispatch(new LogoutUser());
  }
}
