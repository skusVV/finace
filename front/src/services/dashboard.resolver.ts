import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Store, select} from '@ngrx/store';
import {IState, dataStateSelector} from '../store/reducers';
import {LoadCategories} from '../store/actions/data.actions';
import {map, take} from 'rxjs/operators';
import {ICategories} from '../store/reducers/data.reducer';

@Injectable()
export class DashboardResolver implements Resolve<Observable<ICategories[] | null>> {
  constructor(private http: HttpClient, private store: Store<IState>) {}

  resolve() {
    this.getData();

    return this.waitData();
  }

  private waitData(): Observable<ICategories[]> {
    return this.store.pipe<ICategories[]>(
      select(dataStateSelector),
      map(({categories}) => categories),
      take(1)
    );
  }

  private getData(): void {
    this.store.dispatch(new LoadCategories());
  }
}
