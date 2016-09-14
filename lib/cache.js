'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const redis = require('redis');
const redisUrl = require('./configs/redis.config');

const client = redis.createClient(redisUrl);

client.select(1, () => {});

client.on('ready', _asyncToGenerator(function* () {
  console.log('redis server ready!');
}));

client.on('error', err => {
  console.log('Error: ' + err);
});

module.exports = client;