var mongo = require('mongodb');
var host = 'localhost';
var port = 27017;

var server = new mongo.Server(host,port,{auto_reconnect:true});
var db = new mongo.Db('ten',server,{salf:true});
module.exports = db;

//   D:\HHL\mongodb\bin     D:\HHL\mongodb\data\tenData