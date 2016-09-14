'use strict';

const oauthConfig = require('./configs/oauth2.config');

const model = module.exports;

const accessTokens = {};
const refreshTokens = {};

/*
 *
 */
model.dump = () => {
  // console.log('## accessTokens ################');
  // console.log(accessTokens);
  // console.log('## refreshTokens ################');
  // console.log(refreshTokens);
};

/*
 *
 */
model.getAccessToken = (bearerToken, callback) => {
  const token = accessTokens[bearerToken] || false;

  if (token) {
    // Check timeout?

    return callback(false, token);
  }

  return callback(false, false);
};

/*
 *
 */
model.getRefreshToken = (bearerToken, callback) => {
  const token = refreshTokens[bearerToken] || false;

  if (token) {
    return callback(false, token);
  }

  return callback(false, false);
};

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
  accessTokens[accessToken] = {
    accessToken,
    clientId,
    userId,
    expires
  };

  return callback(false);
};

/*
 *
 */
model.saveRefreshToken = (refreshToken, clientId, expires, userId, callback) => {
  refreshTokens[refreshToken] = {
    refreshToken,
    clientId,
    userId,
    expires
  };

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