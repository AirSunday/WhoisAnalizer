const models = require('@WhoisChecker/app/setup');
module.exports = (app) => {
  const api = app.WhoisCheckerAPI.app.api.auth;
  app.route('/')
     .get((req, res) => res.send('Whois Checker API'));
  app.route('/api/v1/auth')
     .post(api.login(models.User));
}