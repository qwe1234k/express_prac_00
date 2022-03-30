const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  NickName: {
    type: String,
    required: true,
    unique: true,
  },
  Pw: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('signup', schema);
