const koa = require('koa');
const mount = require('koa-mount');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const oauthserver = require('koa-oauth-server');
const model = require('./model');

const app = koa();
const router = new Router();

const port = 3000;

app.use(bodyparser());

app.oauth = oauthserver({
  model, // 查看https://github.com/thomseddon/node-oauth2-server for specification
  grants: ['password', 'refresh_token'],
  debug: true,
});

app.use(logger());

/*
 *  Secret router here.
 *
 */
app.use(mount('/oauth2', router.middleware()));

router.post('/token', app.oauth.grant());

app.listen(port, function cb() {
  console.log('Server started on port ', port); // eslint-disable-line no-console
});
