const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;



const Account = new Schema({
    username: {type: String, maxLength: 20, unique: true, required : true},
    name: {type: String, default : 'user'},
    passwords: {type: String, minLength: 6, required : true},
    email: {type: String},
    phoneNumber: {type: String,},
    address: {type: String},
  },
  {
    timestamps: true
  },
);

Account.methods.encryptPassord = function(passwords){
  return bcrypt.hashSync(passwords, bcrypt.genSaltSync(5), null);
};

Account.methods.validPassword = function(passwords){
  return bcrypt.compare(passwords, this.passwords);
};

Account.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
 });

// mongoose.plugin(slug);

module.exports = mongoose.model('Account', Account);