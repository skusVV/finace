import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IPayment, ICurrencyExchange} from '../../../store/reducers/data.reducer';
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

  selectRow(payment: IPayment) {
    this.selectPayment.emit(payment);
  }

  private exchangeCurrency(amount: number, type: string): number {
    // return amount;
    // TODO need top decide promlem with not stable api of exchange
    return this.currencyExchange && type !== 'USD' && type !== 'EUR'
      ? amount
      : amount * this.currencyExchange.find(currency => currency.currencyName === type).rate;
  }
}
