'use strict';

const koa = require('koa');
const argv = require('argv');
const cors = require('koa-cors');
const mount = require('koa-mount');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const oauthserver = require('koa-oauth-server');
const model = require('./model');
const corsOptions = require('./configs/cors.config');
const argvOptions = require('./configs/argv.config');

const app = koa();
const router = new Router();

const args = argv.option(argvOptions).run();
const port = args.options.port || 3000;

app.use(cors(corsOptions));
app.use(logger());
app.use(bodyparser());

app.oauth = oauthserver({
  model, // refer https://github.com/thomseddon/node-oauth2-server for specification
  grants: ['password', 'refresh_token'],
  debug: true
});

/*
 *  Secret router here.
 *
 */
app.use(mount('/oauth2', router.middleware()));

router.post('/token', app.oauth.grant());

app.listen(port, () => {
  console.log('Server started on port ', port); // eslint-disable-line no-console
});