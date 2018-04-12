/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/User');

const userData = [{
  username: 'test 1',
  email: 'test 1',
  password: 'password',
  passwordConfirmation: 'password',
  content: [],
  image: 'test 1',
  followedUsers: [],
  suggestedContent: [],
  musicLoverBadge: 'test 1',
  filmLoverBadge: 'test 1',
  tvLoverBadge: 'test 1'
}, {
  username: 'test 2',
  email: 'test 2',
  password: 'password',
  passwordConfirmation: 'password',
  content: [],
  image: 'test 2',
  followedUsers: [],
  suggestedContent: [],
  musicLoverBadge: 'test 2',
  filmLoverBadge: 'test 2',
  tvLoverBadge: 'test 2'
}];

describe('GET /users', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({})
    ])
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/user')
      .expect(200, done);
  });

  // it('should return an array of users', done => {
  //   api
  //     .get('/api/user')
  //     .end((err, res) => {
  //       expect(res.body).to.be.an('array');
  //       res.body.forEach(user => {
  //         expect(user).to.include.keys([
  //           'username',
  //           'email',
  //           'password',
  //           'content',
  //           'image',
  //           'followedUsers',
  //           'suggestedContent',
  //           'musicLoverBadge',
  //           'filmLoverBadge',
  //           'tvLoverBadge'
  //         ]);
  //       });
  //       done();
  //     });
  // });
});
