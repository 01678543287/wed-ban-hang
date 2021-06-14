const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;



const Product = new Schema({
  name: {type: String},
  description: {type: String},
  image: {type: String},
  imageshow1: {type: String},
  imageshow2: {type: String},
  price: {type: Number},
  cateID: {type: Schema.Types.ObjectId},
  slug: { type: String, slug: 'name', unique: true },
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