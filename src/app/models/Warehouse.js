const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;



const Warehouse = new Schema({
  product: {type: mongoose.SchemaTypes, ref: 'Product' },
  qty: {type: Number},
  },
  {
    timestamps: true
  },
);

Warehouse.plugin(mongooseDelete, {
  deteteAt: true,
  overrideMethods: 'all',
 });
mongoose.plugin(slug);


module.exports = mongoose.model('Warehouse', Warehouse);