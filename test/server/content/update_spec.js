/* global api, describe, it, expect, beforeEach */

const Content = require('../../../models/Content');
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const contentData = [{
  content: {
    artwork: 'test',
    name: 'test',
    artist: 'test',
    album: 'test',
    mediaType: 'test',
    previewUrl: 'test',
    consumedStatus: false,
    userId: 'test'
  }
}, {
  timestamps: true
}];

const userData = { username: 'test', email: 'test@test.com', password: 'test', passwordConfirmation: 'test' };
let token;
let content;
let user;

describe('PUT /user/:id/content/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Content.remove({})
    ])
      .then(() => Promise.props({
        content: Content.create(contentData[0]),
        user: User.create(userData)
      }))
      .then(data => {
        content = data.content;
        user = data.user;
        token = jwt.sign({ sub: data.user._id }, secret, { expiresIn: '5m' });
      })
      .then(() => console.log(user))
      .then(done);
  });

  it('should return a 401 response', done => {
    api
      .put(`/api/user/${user._id}/content/${content._id}`)
      .expect(401, done);
  });
});
