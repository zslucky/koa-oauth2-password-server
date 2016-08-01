var koa = require('koa');
var mount = require('koa-mount');
var Router = require('koa-router');
var bodyparser = require('koa-bodyparser');
var oauthserver = require('koa-oauth-server');
var model = require('./model');

var app = koa();
var router = new Router();

app.use(bodyparser());

app.oauth = oauthserver({
  model: model, // 查看https://github.com/thomseddon/node-oauth2-server for specification
  grants: ['password'],
  debug: true
});

console.log(app);

app.use(mount('/oauth2', router.middleware()));

router.post('/token', app.oauth.grant());

app.listen(3000);	
