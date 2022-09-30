const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.whoisdbs = require("./whois.model.js")(sequelize, Sequelize);
db.sessionsdbs = require("./session.model.js")(sequelize, Sequelize);
db.usersdbs = require("./users.model.js")(sequelize, Sequelize);
db.nsserversdbs = require("./nsservers.model.js")(sequelize, Sequelize);
db.registrantsdbs = require("./registrants.model.js")(sequelize, Sequelize);
db.newsdbs = require("./news.model.js")(sequelize, Sequelize);

module.exports = { sequelize, db };