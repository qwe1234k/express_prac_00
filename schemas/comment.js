const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  Comment: {
    type: String,
  },
  CommentId: {
    type: String,
    required: true,
    unique: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  PostId: {
    type: String,
    required: true,
  },
  NowDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('comment', schema);
