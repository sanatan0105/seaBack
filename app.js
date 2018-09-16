const express = require("express");
const app = express();
const category = require('./db/models').category;
const sequelize = require('sequelize');
var config = require('./config/config.js');
const bodyParser = require("body-parser");
var morgan = require('morgan');
var path = require('path')
var fs = require('fs')
var rfs = require('rotating-file-stream')
var logDirectory = path.join(__dirname, 'log')
const router  = require('./router');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined'));
// app.use(morgan('combined', { stream: accessLogStream }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type: application/json; charset=utf-8",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
    
  }
  next();
});

// Routes which should handle requests

app.use(require('./router')); 


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;