import {Component, Input} from '@angular/core';
import {IPayment} from '../../../store/reducers/data.reducer';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less'],
})
export class PaymentComponent {
  @Input() payment: IPayment;
}
