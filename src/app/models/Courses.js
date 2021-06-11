const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;



const Course = new Schema({
    name: {type: String, maxLength: 255},
    description: {type: String, maxLength: 600},
    image: {type: String, maxLength: 255},
    videoId: {type: String, maxLength: 100 },
    slug: { type: String, slug: 'name', unique: true },
    
  },
  {
    timestamps: true
  },
);

Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
 });
mongoose.plugin(slug);


module.exports = mongoose.model('Course', Course);