const mongoose = require("mongoose");

const Assignment = mongoose.model(
  "Assignment",
  new mongoose.Schema({
    details: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      default: Date.now() + 7 * 86400000,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  })
);

module.exports = Assignment;
