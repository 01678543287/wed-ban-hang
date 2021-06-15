const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;



const Revenue = new Schema({
    type : {type: String},
    money : {type: Number},
    products : {type: Array},
    date : Date,
    amounts : {type: Array},
  },
  {
    strict: false,
  },
);



module.exports = mongoose.model('Revenue', Revenue);