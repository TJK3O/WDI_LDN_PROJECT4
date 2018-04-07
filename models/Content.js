const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required' },
  artist: { type: String, required: 'Artist is required' },
  album: { type: String, required: 'Album is required' },
  mediaType: { type: String, required: true },
  previewUrl: { type: String, required: 'Release date is required' },
  consumedStatus: { type: Boolean, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);
