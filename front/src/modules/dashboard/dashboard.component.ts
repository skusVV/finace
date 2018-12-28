import {Component, OnInit} from '@angular/core';
import {IState, userStateSelector, dataStateSelector} from '../../store/reducers';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {ICategories, IMonth} from '../../store/reducers/data.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit{
  userName: Observable<string>;
  categories: Observable<ICategories[]>;
  months: Observable<IMonth[]>;

  constructor(private store: Store<IState>) {}

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

    this.months = dataStateStream.pipe(
      map(({months}) => months)
    );
  }
}
