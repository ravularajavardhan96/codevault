const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  code:     { type: String, required: true },
  language: { type: String, required: true },
  tags:     [String],
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Snippet', SnippetSchema);