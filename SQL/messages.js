   var utils = require('./server-utils');
var db = require('./db');
var promise = require('bluebird');

var idCounter = 1;
var messages = [];
var user = {};
var msg = {};

exports.getMessages = getMessages = function(req, res){
  utils.sendResponse(res, {results: messages});
};



exports.postMessage = postMessage = function(req, res){
  console.log('in post messge')

  utils.collectData(req, function(err, data){
    var message = data;

    user.user_name = message.username;
    msg.context = message.text;
    message.objectId = idCounter;
    idCounter += 1;
    messages.unshift(message);
    db.checkUserTable(user.user_name, function(data){
      db.addMessageToTable(data, msg.context, function(err, result) {
        if (err) {console.log(err);}
        else {
          console.log(result);
        }
      });
    });
    utils.sendResponse(res, {message : message}, 201);
  });
};


// if we were dealing with more than one data type (users, rooms, etc.),
// the code below might live in 'server-responses.js' or some more generic module

exports.send404 = send404 = function(req, res){
  utils.sendResponse(res, 'Not Found', 404);
};

var sendOptionsResponse = function(req, res){
  utils.sendResponse(res, null);
};

exports.sendOptionsResponse = sendOptionsResponse;

