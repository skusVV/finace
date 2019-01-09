import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, tap, takeUntil} from 'rxjs/operators';
import {IState, userStateSelector} from '../store/reducers';
import {DEFAULT_ERROR, DEFAULT_SNACK_BAR_DURATION} from '../constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroyStream = new Subject<void>();

  constructor(private snackBar: MatSnackBar, private store: Store<IState>) {}

  ngOnInit() {
    this.store.pipe(
      takeUntil(this.destroyStream),
      distinctUntilChanged(),
      select(userStateSelector),
      map(({error}) => error),
      filter(error => error && !!error.length),
      tap(error => this.openSnackBar(error))
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyStream.next();
    this.destroyStream.complete();
  }

  openSnackBar(message = DEFAULT_ERROR) {
    this.snackBar.open(message, '', { duration: DEFAULT_SNACK_BAR_DURATION})
  }

}
