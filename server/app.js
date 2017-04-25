/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';
import seedDatabaseIfNeeded from './config/seed';
import request from 'request';
import statusMonitor from './config/monitor';
import sendEmail from './config/mailer';
import checkMonitorInterval from './api/monoptions/checkInterval';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Setup server
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}



// socketio.on('connection', function(socket){
//   console.log('hola 2');
//   var i = 0;
//   var url = 'http://localhost:3000/api/cosass';
//
//   setInterval(function(){
//     var requestData = {
//       cosas : i
//     };
//     request({
//     url: url,
//     method: "POST",
//     json: requestData
//
//     },function (error, response, body) {
//         if (!error && response.statusCode === 200) {
//             console.log(body)
//         }
//         else {
//             console.log(body)
//             console.log("error: " + error)
//             console.log("response.statusCode: " + response.statusCode)
//             console.log("response.statusText: " + response.statusText)
//           }
//         })
//       i++;
//     }, 1000);
//
// });




var defaultReq = {
  interval : 30000
}







var interval = checkMonitorInterval(defaultReq);
console.log("inverval: "+interval);
statusMonitor(30000);
seedDatabaseIfNeeded();
setImmediate(startServer);

// Expose app
exports = module.exports = app;
