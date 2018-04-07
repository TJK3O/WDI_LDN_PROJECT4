const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  artwork: { type: String },
  name: { type: String },
  artist: { type: String },
  album: { type: String  },
  mediaType: { type: String  },
  previewUrl: { type: String },
  consumedStatus: { type: Boolean },
  userId: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);
