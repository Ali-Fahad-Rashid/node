const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  googleId: {
    type: String,
  },
}, { timestamps: true });

userSchema.plugin(findOrCreate);


const Users = mongoose.model('user', userSchema);
module.exports = Users;