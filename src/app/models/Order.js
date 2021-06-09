const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;



const Order = new Schema({
  user: {type: mongoose.SchemaTypes, ref: 'User' },
  nameKH: {type: String, require: true},
  cart: {type: Object, require: true},
  address: {type: String, require: true},
  phone: {type: String, require: true},
  email: {type: String, require: true},
  },
  {
    timestamps: true
  },
);

// Order.plugin(mongooseDelete, {
//   overrideMethods: 'all',
//  });
// mongoose.plugin(slug);


module.exports = mongoose.model('Order', Order);