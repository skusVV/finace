import {Component, OnInit} from '@angular/core';
import {IState, userStateSelector} from '../../store/reducers';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit{
  userName: Observable<string>;

  constructor(private store: Store<IState>) {}

  ngOnInit() {
    this.userName =  this.store.pipe(
      distinctUntilChanged(),
      select(userStateSelector),
      map(({userName}) => userName)
    );
  }
}
