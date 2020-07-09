const mongoose = require('mongoose');

const user = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  id: {
    type: Number
  }
});

const User = mongoose.model('user', user);

module.exports = User;
