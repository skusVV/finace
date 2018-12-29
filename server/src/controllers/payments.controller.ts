import {PaymentSchema} from '../models/payments.model';
import * as mongoose from 'mongoose';

export class PaymentsController {
  static Payment = mongoose.model('Payment', PaymentSchema);

  async newPayment(req, res, next) {
    const userId = req.user.sub;
    const amount = req.body.amount;
    const payment = new PaymentsController.Payment({amount, userId, comment: 'Initial payment'});

    payment.save((err, user) => {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  }
}
