import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: 'Enter a name of Category'
  },
  percent: {
    type: Number,
    required: 'Enter a percent of Category'
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

