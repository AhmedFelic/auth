const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
  roles: {
    Member: Number,
    Admin: Number,
  },
});


userSchema.pre('save', async function (next){
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.isValidPassword = async function (password){
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema);
