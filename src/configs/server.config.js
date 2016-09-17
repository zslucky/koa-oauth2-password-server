const serverOptions = {
  grants: ['password', 'refresh_token'],
  debug: true,
  accessTokenLifetime: 3600, // This is default value.
  refreshTokenLifetime: 1209600, // This default value.
};

module.exports = serverOptions;
