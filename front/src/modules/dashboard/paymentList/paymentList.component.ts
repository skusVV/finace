import {Component, Input, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import {IPayment, ICurrencyExchange} from '../../../store/reducers/data.reducer';
import {DATA_FORMAT} from '../../../constants';
import {compose} from '../../../utils/compose';

@Component({
  selector: 'app-payment-list',
  templateUrl: './paymentList.component.html',
  styleUrls: ['./paymentList.component.less'],
})
export class PaymentListComponent {
  @Input() payments: IPayment[];
  @Input() currencyExchange: ICurrencyExchange[];
  @Output() selectPayment = new EventEmitter<IPayment>();

  displayedColumns: string[] = ['created_date', 'amount'];

  getTotalCost() {
    return compose(
      amount => `${amount} UAH`,
      Math.floor,
      () => this.payments.reduce((sum, payment) => sum + this.exchangeCurrency(Number(payment.amount), payment.currency), 0)
    )();
  }

  changeDate(date: string) {
    // TODO rewrite to angular pipe
    return moment(date).format(DATA_FORMAT);
  }

  selectRow(payment: IPayment) {
    this.selectPayment.emit(payment);
  }

  private exchangeCurrency(amount: number, type: string): number {
    return this.currencyExchange && type !== 'USD' && type !== 'EUR'
      ? amount
      : amount * this.currencyExchange.find(currency => currency.currencyName === type).rate;
  }
  //
  // private addCurrencySymbol(amount: string): string {
  //   return `${amount} UAH`;
  // }
  //
  // private reduceAmounts() {
  //   this.payments.reduce((sum, payment) => sum + this.exchangeCurrency(Number(payment.amount), payment.currency), 0);
  // }
}
