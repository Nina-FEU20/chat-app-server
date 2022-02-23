const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
      minLength: [4, 'Usernames require minimum of 4 characters'],
      maxLength: [24, 'Usernames require maximum of 24 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password require minimum of 6 characters'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
