const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('../routes');
const mongoose = require('mongoose');

const createApp = () => {
  const app = express();
  /* mongoose.connect(database.URI).then((db) => console.log("db is connected")).catch((err) => console.log(err)); */

  mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () =>
  console.log('Connected to database!'))

  // App config
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));

  // View engine config
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', '..', 'templates'));

  // Router
  app.use(router);
  return app;
};

module.exports = createApp;
