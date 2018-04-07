const Content = require('../models/Content');

function indexRoute(req, res, next) {
  return Content.find()
    .then(content => res.json(content))
    .catch(next);
}

function createRoute(req, res, next) {
  return Content.create(req.body)
    .then(content => res.status(201).json(content))
    .catch(next);
}

function showRoute(req, res, next) {
  return Content.findById(req.params.id)
    .then(content => res.json(content))
    .catch(next);
}

function updateRoute(req, res, next) {
  return Content.findById(req.params.id)
    .then(content => Object.assign(content, req.body))
    .then(content => content.save())
    .then(content => res.json(content))
    .catch(next);
}

function deleteRoute(req, res, next) {
  return Content.findById(req.params.id)
    .then(content => content.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
