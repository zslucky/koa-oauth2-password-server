const MongoClient = require('mongodb').MongoClient;

const username = 'heroku';
const password = 'heroku';
const database = 'heroku_lp92mxk1';
const port = 29426;

let db;

const url = `mongodb://${ username }:${ password }@ds029426.mlab.com:${ port }/${ database }`;

MongoClient.connect(url, (err, dbConnect) => {
  db = dbConnect;
  // db.close();
});

module.exports = db;