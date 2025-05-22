const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
    index: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  source: {
    type: String,
    required: true
  },
  publishedAt: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('articles', articleSchema);

