const oauthConfig = require('./configs/oauth2.config');
const serverOptions = require('./configs/server.config');
const cacheService = require('./cache');

const model = module.exports;

const ACCESS_PREFIX = 'access.';
const REFRESH_PREFIX = 'refresh.';

/*
 * Get access token
 */
model.getAccessToken = async (bearerToken, callback) => {
  const cacheKey = `${ACCESS_PREFIX}${bearerToken}`;
  const token = await cacheService.asyncGet(cacheKey);

  if (token) {
    return callback(false, token);
  }

  return callback(false, false);
};

/*
 * Get refresh token
 */
model.getRefreshToken = async (bearerToken, callback) => {
  const cacheKey = `${REFRESH_PREFIX}${bearerToken}`;
  const token = await cacheService.asyncGet(cacheKey);

  if (token) {
    return callback(false, token);
  }

  return callback(false, false);
};

/*
 * Get client
 */
model.getClient = (clientId, clientSecret, callback) => {
  const client = oauthConfig.allowedClients[clientId];

  if (client && (clientSecret === null || client.clientSecret === clientSecret)) {
    return callback(false, client);
  }

  return callback(false, false);
};

/*
 * Get corresponding client's allowed grant type.
 */
model.grantTypeAllowed = (clientId, grantType, callback) => {
  const allowedGrantTypeClients = oauthConfig.authorizedClientIds[grantType];

  return callback(false, allowedGrantTypeClients && allowedGrantTypeClients.includes(clientId));
};

/*
 * Save the access token
 */
model.saveAccessToken = (accessToken, clientId, expires, userId, callback) => {
  const token = {
    accessToken,
    clientId,
    userId,
    expires,
  };

  const cacheKey = `${ACCESS_PREFIX}${accessToken}`;

  cacheService.setex(
    cacheKey,
    serverOptions.accessTokenLifetime,
    JSON.stringify(token)
  );

  return callback(false);
};

/*
 *  Save the refresh token
 */
model.saveRefreshToken = (refreshToken, clientId, expires, userId, callback) => {
  const token = {
    refreshToken,
    clientId,
    userId,
    expires,
  };

  const cacheKey = `${REFRESH_PREFIX}${refreshToken}`;

  cacheService.setex(
    cacheKey,
    serverOptions.refreshTokenLifetime,
    JSON.stringify(token)
  );

  return callback(false);
};

/*
 *  Get user
 */
model.getUser = (username, password, callback) => {
  const user = oauthConfig.users[username];

  if (user && user.password === password) {
    return callback(false, user);
  }

  return callback(false, false);
};
