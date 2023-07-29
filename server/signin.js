const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    date: {
      type: String
    },
    coin: {
      type: Number
    }
  }, {
    collection: "user"
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports = User
  