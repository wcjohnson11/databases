var mysql = require('mysql');
var utils = require('./server-utils');
var messages = require('./messages.js');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  database: "chat"
});


dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

exports.checkUserTable = function(username, callback){
//this first sql query isn't working, adding duplicates
  dbConnection.query('SELECT user_name from users WHERE user_name = ?', username,
  function(err, rows) {
    if (err) {
      dbConnection.query('INSERT INTO users SET user_name=?', username, function(err, result){
        if (err) {console.log('db2', err);} else {callback(result.insertId);}
      });
    }
    else {
      console.log('rows HELLO',rows[0]);
      callback(rows[0]);
    }
  });
};

exports.addMessageToTable = function (userId, message, callback) {
  dbConnection.query('INSERT INTO messages (user_id, context) VALUES (?, ?)', [userId, message], function(err, result) {
    if (err) { console.log('amt', err)} else {
      dbConnection.query('SELECT user_name, context from messages WHERE user_id= ?', userId,
      function(err, rows) {
        if(err) {console.log("HALP", err);} else {callback(rows[0]);}
      });
    }
  });
};

exports.getMessageFromTable = function() {

};

// dbConnection.query('INSERT INTO messages SET ?', {context: 'hey'},
//   function(err, result) {
//     if (err) throw err;
//     // console.log(result.insertId,'');
//   });

// dbConnection.end();


