let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
  ledgerAccount: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
});

module.exports = mongoose.model('Category', CategorySchema);

