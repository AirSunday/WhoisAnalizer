const passport = require('passport'),
      config = require('@config'),
      models = require('@WhoisChecker/app/setup');
module.exports = (app) => {
  const api = app.WhoisCheckerAPI.app.api.user;
  app.route('/api/v1/signup')
     .post(api.signup(models.User));
  app.route('/api/v1/track')
     .post(api.track(models.User));
  app.route('/api/v1/alltrack')
     .post(api.alltrack(models.User));
  app.route('/api/v1/nowuser')
     .get(passport.authenticate('jwt', config.session), api.nowuser(models.User,  app.get('whoissecret')));
  app.route('/api/v1/deletetrack')
     .post(api.deletetrack(models.User));   
}