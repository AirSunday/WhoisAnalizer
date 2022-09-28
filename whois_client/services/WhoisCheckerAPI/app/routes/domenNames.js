module.exports = (app) => {
  const api = app.WhoisCheckerAPI.app.api.domenName;
  app.route('/api/v1/getinfo')
     .post(api.getInfoDomen());
}
