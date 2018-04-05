const express = require('express');

const app = express();
const router = require('./config/router');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4000;
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
