let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ReportSchema = new Schema({
  created: {type: Date, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  expenses: [
    {
      created: {type: Date},
      amount: {type: Number, min: 0},
      description: {type: String, required: true},
      category: {type: Schema.Types.ObjectId, ref: 'Category'},
      image: {type: String, required: true},
      merchant: {type: String, required: true},
      expenseDate: {type: Date}
    }]
}, {toJSON: {virtuals: true}});

ReportSchema.virtual('total')
  .get(function() {
    this.expenses
      .map(function (item) { return item.amount; })
      .reduce(function (a, b) { return a + b; }, 0);
  });

module.exports = mongoose.model('Report', ReportSchema);

