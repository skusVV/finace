import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {IState, dataStateSelector} from '../../../store/reducers';
import {IPayment, ICategory} from '../../../store/reducers/data.reducer';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {RedirectTo} from '../../../store/actions/router.actions';
import {OpenVisualizeCategory} from '../../../store/actions/category.actions';
import {DialogAddNewPayment} from '../../../store/actions/dialog.actions';

const CATEGORY_ID_PARAM = 'id';

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

    this.payments = dataStateStream.pipe(
        map(({payments}) => payments.filter(payment => payment.categoryId === this.routerParamId)),
    );

    this.category = dataStateStream.pipe(
      map(({categories}) => categories.filter(category => category._id === this.routerParamId)[0]),
    );
  }

  selectPayment(e: Event) {
    console.log('selectPayment');
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
