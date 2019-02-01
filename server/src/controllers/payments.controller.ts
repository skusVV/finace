import {PaymentSchema} from '../models/payments.model';
import * as mongoose from 'mongoose';

export class PaymentsController {
  static Payment = mongoose.model('Payment', PaymentSchema);

  async newPayment(req, res, next) {
    const userId = req.user.sub;
    const payment = new PaymentsController.Payment({...req.body, userId});

    payment.save((err, payment) => {
      if (err) {
        res.send(err);
      }

      res.json(payment);
    });
  }

  async getAllPayments(req, res, next) {
    const userId = req.user.sub;

    const query = PaymentsController.Payment.find({}, data => data ? data.filter(payment => payment.userId === userId) : []);

    query.exec(function (err, payments) {
      if (err) return next(err);
      res.send(payments);
    });
  }

  async deletePayment(req, res, next) {
    const query = PaymentsController.Payment.remove({'_id': req.params.id});

    query.exec(function (err, payments) {
      if (err) return next(err);
      res.send({id: req.params.id});
    });
  }
}
