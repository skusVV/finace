import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged, map, take, filter, tap} from 'rxjs/operators';
import {IState, dataStateSelector} from '../../../store/reducers';
import {IPayment, ICategory} from '../../../store/reducers/data.reducer';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {RedirectTo} from '../../../store/actions/router.actions';
import {OpenVisualizeCategory, SelectCategory} from '../../../store/actions/category.actions';
import {DialogAddNewPayment} from '../../../store/actions/dialog.actions';
import {SelectPayment} from '../../../store/actions/payment.actions';

export const CATEGORY_ID_PARAM = 'id';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
})
export class CategoryComponent implements OnInit {
  payments: Observable<IPayment[]>;
  category: Observable<ICategory>;

  constructor(private route: ActivatedRoute, private store: Store<IState>) {}

  ngOnInit() {
    const dataStateStream = this.store.pipe(
      distinctUntilChanged(),
      select(dataStateSelector),
    );

    // TODO get rid of subscribe better user routing from @ngrx/
    dataStateStream.pipe(
      filter(({selectedCategory, categories}) => !selectedCategory && !!categories.length),
      tap(() => this.store.dispatch(new SelectCategory(this.routerParamId)))
    ).subscribe();

    this.payments = dataStateStream.pipe(
        map(({payments}) => payments.filter(payment => payment.categoryId === this.routerParamId)),
    );

    this.category = dataStateStream.pipe(
      map(({selectedCategory}) => selectedCategory),
    );
  }

  selectPayment(category: ICategory) {
    this.store.dispatch(new SelectPayment(category))
  }

  back() {
    this.store.dispatch(new RedirectTo(['']))
  }

  visualizeCategory() {
    this.store.dispatch(new OpenVisualizeCategory());
  }

  addPayment() {
    this.store.dispatch(new DialogAddNewPayment());
  }

  private get routerParamId(): string {
    return this.route.snapshot.params[CATEGORY_ID_PARAM];
  }
}
