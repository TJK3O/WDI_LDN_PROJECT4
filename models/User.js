const mongoose = require('mongoose');
// bcrypt is used to hash and salt our passwords
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: 'username required' },
  email: { type: String, required: 'email required' },
  password: { type: String, required: 'password required' },
  content: [{
    artwork: { type: String },
    name: { type: String },
    artist: { type: String },
    album: { type: String  },
    mediaType: { type: String  },
    previewUrl: { type: String },
    consumedStatus: { type: Boolean },
    userId: { type: String },
    resourceId: { type: String },
    isrc: { type: String },
    filmId: { type: String },
    tvId: { type: String }
  }],
  image: { type: String },
  // This means that we can store ObjectIds in the array and then simply populate them
  followedUsers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  suggestedContent: [],
  musicLoverBadge: { type: String },
  filmLoverBadge: { type: String },
  tvLoverBadge: { type: String }
});

userSchema
  // We us a virtual as we don't need to store this in the database it just allows us to compare passwords
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.set('toJSON', {
  transform(doc, json) {
    delete json.password;
    delete json.__v;
  }
});

module.exports = mongoose.model('User', userSchema);
