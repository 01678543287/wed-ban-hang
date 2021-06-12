const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;



const Category = new Schema({
    name: {type: String},
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