const mongoose = require("mongoose");

const schema = mongoose.Schema({
  uri: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  context: { type: String, required: true },
  tags: [{ type: String }],
  lastUpdated: { type: Date, required: true },
  created: { type: Date, required: true }
});

module.exports = mongoose.model("Note", schema);
