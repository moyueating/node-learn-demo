
const express = require('express');
const mongoose = require('mongoose')
const config = require('./config')
const path = require('path');


var app = express();

require('./config/express')(app)


connect()

function listen(){
  app.listen(config.serverPort, function(){
    console.log(`application is listening ${config.serverPort}`)
  })
}

function connect(){
  mongoose.connection
  .on('error', console.log)
  .on('disconnect', connect)
  .once('open', listen)
  return mongoose.connect(config.db, { keepAlive: true, useNewUrlParser: true })
}




