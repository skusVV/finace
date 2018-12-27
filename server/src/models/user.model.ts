import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: 'Enter a title'
  },
  mail: {
    type: String,
    unique: true,
    required: 'Enter a mail'
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
