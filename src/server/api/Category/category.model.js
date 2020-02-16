
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  brand: String, // e.g. GAP
  pcid: String, // site-specific
  category: String, // e.g. Sweater
})

module.exports = mongoose.model('Category', CategorySchema);
