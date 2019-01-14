import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Store, select} from '@ngrx/store';
import {IState, dataStateSelector} from '../store/reducers';
import {LoadCategories, LoadPayments} from '../store/actions/data.actions';
import {take} from 'rxjs/operators';
import {ICategory} from '../store/reducers/data.reducer';

@Injectable()
export class DashboardResolver implements Resolve<Observable<ICategory[] | null>> {
  constructor(private http: HttpClient, private store: Store<IState>) {}

  resolve() {
    this.getData();

    return this.waitData();
  }

  private waitData(): Observable<ICategory[]> {
    return this.store.pipe<ICategory[]>(
      select(dataStateSelector),
      take(1)
    );
  }

  private getData(): void {
    this.store.dispatch(new LoadCategories());
    this.store.dispatch(new LoadPayments());
  }
}
