const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
  }, // Create Task / Update Task / Delete Task
  taskId: {
    type: String,
    required: true,
  },
  updatedContent: {
    type: Object,
  }, // only changed content
});

module.exports = mongoose.model("Log", logSchema);
