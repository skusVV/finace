import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ArticleSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Enter a title'
  },
  hash: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});
