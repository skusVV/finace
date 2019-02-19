import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IPayment} from '../../../store/reducers/data.reducer';
import {compose} from '../../../utils/compose';
import {CurrencyService} from '../../../services/currency.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './paymentList.component.html',
  styleUrls: ['./paymentList.component.less'],
})
export class PaymentListComponent {
  // TODO this component should know nothing about any payments. Only about row which we clicked
  @Input() payments: IPayment[];
  @Output() selectPayment = new EventEmitter<IPayment>();

  displayedColumns: string[] = ['created_date', 'amount'];

  constructor(private currencyService: CurrencyService){}

  //TODO It need to know about currencyService nothing. totalCost should came from input
  getTotalCost() {
    return compose(
      amount => `${amount} UAH`,
      Math.floor,
      () => this.payments.reduce((sum, payment) => sum + this.currencyService.exchangeCurrency(Number(payment.amount), payment.currency), 0)
    )();
  }

  selectRow(payment: IPayment) {
    this.selectPayment.emit(payment);
  }
}
