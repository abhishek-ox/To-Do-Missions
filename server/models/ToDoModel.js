const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the timestamp when a new task is created
  },
});

module.exports = mongoose.model("ToDo", ToDoSchema);
