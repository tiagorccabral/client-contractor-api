const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./model')
const routes = require('./routes/v1');
// Set root path
const app = express();

app.use(bodyParser.json());

// adds helmet HTTP protection
app.use(helmet());

// Sets CORS and Accepted Origins
app.use(cors());
app.options('*', cors());

app.set('sequelize', sequelize)

app.set('models', sequelize.models)

app.use('/', routes)

module.exports = app;
