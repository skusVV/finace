import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ICurrency} from '../../constants';

interface IPaymentDialog {
  amount: string;
  currency: ICurrency;
  availableCurrencies: string[];
  description: string;
  title: string;
}

@Component({
  selector: 'app-add-payment',
  templateUrl: './addPayment.component.html',
  styleUrls: ['./addPayment.component.less']
})
export class AddPaymentComponent {

  constructor(public dialogRef: MatDialogRef<AddPaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IPaymentDialog) {}

  onNoClick() {
    this.dialogRef.close();
  }

  setCurrency(currency: ICurrency) {
    this.data.currency = currency;
  }
}
