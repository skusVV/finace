import {Component, OnInit} from '@angular/core';
import {ICategory} from '../../../store/reducers/data.reducer';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {DeleteCategory, SelectCategory} from '../../../store/actions/category.actions';
import {DialogAddNewCategory} from '../../../store/actions/dialog.actions';
import {Store, select} from '@ngrx/store';
import {IState, dataStateSelector} from '../../../store/reducers';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categoriesList.component.html',
  styleUrls: ['./categoriesList.component.less']
})
export class CategoriesListComponent implements OnInit{
  categories: Observable<ICategory[]>;
  selectedCategory: Observable<ICategory>;
  constructor(private store: Store<IState>) {}

  ngOnInit() {
    const dataStateStream = this.store.pipe(
      distinctUntilChanged(),
      select(dataStateSelector),
    );

    this.categories = dataStateStream.pipe(
      map(({categories}) => categories)
    );

    this.selectedCategory = dataStateStream.pipe(
      map(({selectedCategory}) => selectedCategory),
    );
  }

  addCategory() {
    this.store.dispatch(new DialogAddNewCategory());
  }

  selectCategory(id: string) {
    this.store.dispatch(new SelectCategory(id));
  }

  deletePayment(id: string) {
    this.store.dispatch(new DeleteCategory(id));
  }
}
