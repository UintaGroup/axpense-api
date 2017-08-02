let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: String,
  url: String,
  text: String
});

ArticleSchema.virtual('date')
  .get(() => this._id.getTimestamp());

module.exports = mongoose.model('Article', ArticleSchema);

