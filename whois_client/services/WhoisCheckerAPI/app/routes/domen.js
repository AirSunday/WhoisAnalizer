const models = require('@WhoisChecker/app/setup');

module.exports = (app) => {
    const api = app.WhoisCheckerAPI.app.api.domen;
    app.route('/api/v1/dget/:id').get(api.get(models.Domen))
    app.route('/api/v1/dcreate/').post(api.create(models.Domen))
    app.route('/api/v1/dgetall').get(api.getAll(models.Domen))
    app.route("/api/v1/dupdate/:id").put(api.update(models.Domen))
    app.route('/api/v1/ddelete/:id').delete(api.delete(models.Domen))
}