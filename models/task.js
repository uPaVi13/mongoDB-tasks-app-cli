const mongoose = require('mongoose');
const { boolean } = require('yargs');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  }, 
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

