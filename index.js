const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./config/router');
const bodyParser = require('body-parser');
// const errorHandler = require('./lib/errorHandler');

const { port, dbURI }  = require('./config/environment');

mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));
// to access the body of a request we needed bodyParser
app.use(bodyParser.json());
app.use('/api', router);

app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
