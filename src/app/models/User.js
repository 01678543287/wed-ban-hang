const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;



const User = new Schema({
    username: {type: String, require: true},
    password: {type: String, maxLength: 600},
    phonenumber: {type: String},
    address: {type: String},
    email: {type: String},
    name: {type: String}
  },
  {
    timestamps: true
  },
);

User.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
 });
// mongoose.plugin(slug);

User.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
};

User.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}
// them comment de push
module.exports = mongoose.model('User', User);