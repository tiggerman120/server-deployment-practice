'use strict';

// libraries
require('dotenv').config();
const express = require('express'); //server
const app = express();//assigning the server to a variable
const PORT = process.env.PORT || 3001

//local files
const notFoundHandler = require('./handlers/404');
const errorHandler = require('./handlers/500');

//routes
app.get('/', renderHome);
app.get('/data', renderData);
app.get('/bad', (req, res, next) => {
  //anytime you put anything inside of next it will throw an error
  next('you messed up')
})
app.use('*', notFoundHandler);

//whenever someone throws an error, use the function errorHandler
app.use(errorHandler);

//callback functions
function renderHome(req, res) {
  res.status(200).send('Hello world');
}

function renderData(req, res, next) {
  const outputObj = {
    10: "even",
    5: "odd",
    "time": new Date()
  }
  res.status(200).json(outputObj);
}

//turning server on
function start(PORT) {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}

module.exports = {
  app: app,
  start: start
}
