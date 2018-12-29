import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PaymentSchema = new Schema({
  amount: {
    type: String,
    required: 'Enter a amount'
  },
  comment: {
    type: String,
    required: 'Enter a payment comment'
  },
  userId: {
    type: String,
    required: 'Enter a userId'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

