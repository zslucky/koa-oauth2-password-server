const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://heroku:heroku@ds029426.mlab.com:29426/heroku_lp92mxk1';

MongoClient.connect(url, (err, db) => {
  db.close();
});
