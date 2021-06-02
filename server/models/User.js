const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  cart: {
    type: Array,
    default: [],
  },

  history: {
    type: Array,
    default: [],
  },

  date: {
    type: Date,
    default: Date.now,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'post',
    },
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'review',
    },
  ],
});

module.exports = mongoose.model('user', UserSchema);
