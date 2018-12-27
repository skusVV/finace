import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {IState, userStateSelector} from '../store/reducers';
import {select, Store} from '@ngrx/store';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {DEFAULT_ERROR, DEFAULT_SNACK_BAR_DURATION} from '../constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private store: Store<IState>) {}

  ngOnInit() {
    this.store.pipe(
      distinctUntilChanged(),
      select(userStateSelector),
      map(({error}) => error),
      filter(error => error && !!error.length),
    ).subscribe(error=> {
      this.openSnackBar(error);
    });
  }

  openSnackBar(message = DEFAULT_ERROR) {
    this.snackBar.open(message, '', { duration: DEFAULT_SNACK_BAR_DURATION})
  }

}
