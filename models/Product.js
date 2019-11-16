const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String
  },
  user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  quantity: {
      type: Number
  },
  smallPrice: {
      type: Number
  },
  bigPrice: Number,
  medPrice: Number,
  date: {
      type: Date,
      default: Date.now
  },
  images:{
    type: Array,
    default:[]
  },
  prejardhja: String
});

module.exports = mongoose.model('Product', productSchema);