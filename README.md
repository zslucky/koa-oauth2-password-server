# koa-oauth2-sso-server
A 'password' grant type based oauth2 authentication server.

### Usage
1. `npm install`.
2. `npm start`. (or `npm run pm2-start`).

### Test
```bash
curl -XPOST -d 'username=admin&password=admin&grant_type=password&client_id=trackr&client_secret=admin' http://localhost:3000/oauth2/token
```