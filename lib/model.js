function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

const oauthConfig = require('./configs/oauth2.config');
const serverOptions = require('./configs/server.config');
const cacheService = require('./cache');

const model = module.exports;

const ACCESS_PREFIX = 'access.';
const REFRESH_PREFIX = 'refresh.';

/*
 *
 */
model.getAccessToken = (() => {
  var _ref = _asyncToGenerator(function* (bearerToken, callback) {
    const cacheKey = `${ ACCESS_PREFIX }${ bearerToken }`;
    const token = yield cacheService.asyncGet(cacheKey);

    if (token) {
      return callback(false, token);
    }

    return callback(false, false);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

/*
 *
 */
model.getRefreshToken = (() => {
  var _ref2 = _asyncToGenerator(function* (bearerToken, callback) {
    const cacheKey = `${ REFRESH_PREFIX }${ bearerToken }`;
    const token = yield cacheService.asyncGet(cacheKey);

    if (token) {
      return callback(false, token);
    }

    return callback(false, false);
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})();

/*
 *
 */
model.getClient = (clientId, clientSecret, callback) => {
  const client = oauthConfig.allowedClients[clientId];

  if (client && (clientSecret === null || client.clientSecret === clientSecret)) {
    return callback(false, client);
  }

  return callback(false, false);
};

/*
 *
 */
model.grantTypeAllowed = (clientId, grantType, callback) => {
  const allowedGrantTypeClients = oauthConfig.authorizedClientIds[grantType];

  return callback(false, allowedGrantTypeClients && allowedGrantTypeClients.includes(clientId));
};

/*
 *
 */
model.saveAccessToken = (accessToken, clientId, expires, userId, callback) => {
  const token = {
    accessToken,
    clientId,
    userId,
    expires
  };

  const cacheKey = `${ ACCESS_PREFIX }${ accessToken }`;

  cacheService.setex(cacheKey, serverOptions.accessTokenLifetime, JSON.stringify(token));

  return callback(false);
};

/*
 *
 */
model.saveRefreshToken = (refreshToken, clientId, expires, userId, callback) => {
  const token = {
    refreshToken,
    clientId,
    userId,
    expires
  };

  const cacheKey = `${ REFRESH_PREFIX }${ refreshToken }`;

  cacheService.setex(cacheKey, serverOptions.refreshTokenLifetime, JSON.stringify(token));

  return callback(false);
};

/*
 *
 */
model.getUser = (username, password, callback) => {
  const user = oauthConfig.users[username];

  if (user && user.password === password) {
    return callback(false, user);
  }

  return callback(false, false);
};