const redis = require('redis');
const redisUrl = require('./configs/redis.config');

const client = redis.createClient(redisUrl);

client.select(1, () => {
  console.log('Using redis database 1.'); // eslint-disable-line no-console
});

client.on('ready', () => {
  console.log('redis server ready!'); // eslint-disable-line no-console
});

client.on('error', (err) => {
  console.log('Error: ', err); // eslint-disable-line no-console
});

client.asyncGet = (key) =>
  new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(value);
    });
  });

module.exports = client;
