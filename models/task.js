var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  type: { type: String, max: 100 },
  description: { type: String, max: 100 },
  checkboxes: [
    {
      isChecked: { type: Boolean },
      text: { type: String }
    }
  ]
  // productId: {type: String, required: true, max: 100}
});

module.exports = mongoose.model('Task', TaskSchema);
