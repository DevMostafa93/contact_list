const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  authorization: {
    type: String,
    required: true,
  },
  deviceToken: {
    type: String,
    required: true
  },
  fingerPrint: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model('Users', UsersSchema);



exports.UserModel = UserModel;