const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;



const Product = new Schema({
  name: {type: String},
  description: {type: String},
  image: {type: String},
  price: {type: Number},
  slug: { type: String, slug: 'name', unique: true },
  category: {type: mongoose.SchemaTypes, ref: 'Category' },

  },
  {
    timestamps: true
  },
);

Product.plugin(mongooseDelete, {
  deteteAt: true,
  overrideMethods: 'all',
 });
mongoose.plugin(slug);


module.exports = mongoose.model('Product', Product);