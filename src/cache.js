const redis = require('redis');
const redisUrl = require('./configs/redis.config');

const client = redis.createClient(redisUrl);

client.select(1, () => {});

client.on('ready', async () => {
  console.log('redis server ready!'); // eslint-disable-line no-console
});

client.on('error', (err) => {
  console.log('Error: ', err); // eslint-disable-line no-console
});

module.exports = client;
