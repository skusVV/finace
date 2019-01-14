import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PaymentSchema = new Schema({
  amount: {
    type: String,
    required: 'Enter a amount',
  },
  currency: {
    type: String,
    required: 'Enter a currency',
  },
  categoryId: {
    type: String,
    required: 'Enter a categoryId',
  },
  userId: {
    type: String,
    required: 'Enter a userId',
  },
  description: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  }
});

