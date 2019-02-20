// import {Component, Input, Output, EventEmitter} from '@angular/core';
// import {IPayment} from '../../../store/reducers/data.reducer';
//
// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.less'],
// })
// export class PaymentComponent {
//   @Input() payment: IPayment;
//   @Output() deletePayment = new EventEmitter<string>();
//   @Output() updatePayment = new EventEmitter<IPayment>();
//
//   onDelete() {
//     this.deletePayment.emit(this.payment._id);
//   }
//
//   onDescriptionChange(description: string){
//     // if (description !== this.payment.description) {
//     //   this.updatePayment.emit({
//     //     ...this.payment,
//     //     description
//     //   })
//     // }
//   }
// }
