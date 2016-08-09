const oauthConfig = {
  allowedClients: {
    trackr: {
      clientId: 'trackr',
      clientSecret: 'admin',
      redirectUri: '',
    },
  },
  authorizedClientIds: {
    password: [
      'trackr',
    ],
    refresh_token: [
      'trackr',
    ],
  },
  users: {
    admin: {
      id: '1',
      username: 'admin',
      password: 'admin',
    },
  },
};

module.exports = oauthConfig;
