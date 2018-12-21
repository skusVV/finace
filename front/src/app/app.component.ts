import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store, select} from '@ngrx/store';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IState, testStateSelector} from '../store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  private test: string;
  private destroyStream = new Subject<void>();

  constructor(private store: Store<IState>) {}

  ngOnInit() {
    this.store.pipe(
      takeUntil(this.destroyStream),
      select(testStateSelector)
    ).subscribe(({test}) => {
      this.test = test;
      console.log(this.test);
    });
  }

  ngOnDestroy() {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
