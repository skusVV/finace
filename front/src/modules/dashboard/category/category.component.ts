import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ICategory, ICurrencyExchange, IPayment} from '../../../store/reducers/data.reducer';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
})
export class CategoryComponent {
  @Input() category: ICategory;
  @Input() payments: IPayment[];
  @Input() currencyExchange: ICurrencyExchange[];
  @Output() selectPayment = new EventEmitter<IPayment>();

}
