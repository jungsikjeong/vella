const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    maxlength: 50,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
    default: [],
  },
  categories: {
    type: Number,
    default: 1,
  },

  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      title: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
        default: [],
      },
      description: {
        type: String,
        required: true,
      },
      productId: {
        type: String,
      },
      productTitle: {
        type: String,
      },
      productPrice: {
        type: Number,
      },
      views: {
        type: Number,
        default: 0,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

// $text , 검색 중요도
// 검색할때 조금 더 신경써서 해줬으면 좋겠는것들
PostSchema.index(
  {
    title: 'text',
  },
  {
    weights: {
      title: 5,
    },
  }
);

module.exports = mongoose.model('post', PostSchema);
