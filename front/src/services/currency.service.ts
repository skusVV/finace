import {Injectable} from '@angular/core';
import {ICurrencyExchange} from '../store/reducers/data.reducer';
import {select, Store} from '@ngrx/store';
import {dataStateSelector, IState} from '../store/reducers';
import {distinctUntilChanged, map} from 'rxjs/operators';


@Injectable()
export class CurrencyService {
  private currencyExchange: ICurrencyExchange[];

  constructor(private store: Store<IState>) {
    const dataStateStream = this.store.pipe(
      distinctUntilChanged(),
      select(dataStateSelector),
    );

    dataStateStream.pipe(
      map(({currencyExchange}) => currencyExchange)
    ).subscribe(data => {
      this.currencyExchange = data;
    })
  }
  exchangeCurrency(amount: number, type: string): number {
    return this.currencyExchange && type !== 'USD' && type !== 'EUR'
      ? amount
      : amount * this.currencyExchange.find(currency => currency.currencyName === type).rate;
  }
}
