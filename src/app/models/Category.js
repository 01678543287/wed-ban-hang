const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;



const Category = new Schema({
    id: {type: String, require: true},
    name: {type: String},
    qty: {type: Number},
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true
  },
);

Category.plugin(mongooseDelete, {
  deteteAt: true,
  overrideMethods: 'all',
 });
mongoose.plugin(slug);


module.exports = mongoose.model('Category', Category);