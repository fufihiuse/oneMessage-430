const mongoose = require('mongoose');

let MessageModel = {};

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000,
  },

  message: {
    type: String,
    required: true,
    trim: true,
    maxLength: 10000,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

MessageModel = mongoose.model('Message', MessageSchema);
module.exports = MessageModel;
