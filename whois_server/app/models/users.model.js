const _ = require("lodash");
const bcrypt = require("bcrypt");
const Bluebird = require("bluebird");

module.exports = (sequelize, Sequelize) => {
  const mappings = {
    userId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    domains: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    role: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    status: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    darkmode: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
  };

  const User = sequelize.define("usersdb", mappings, {
    indexes: [
      {
        name: "user_userId_index",
        method: "BTREE",
        fields: ["userId"],
      },
      {
        name: "user_email_index",
        method: "BTREE",
        fields: ["email"],
      },
      {
        name: "user_role_index",
        method: "BTREE",
        fields: ["role"],
      },
      {
        name: "user_status_index",
        method: "BTREE",
        fields: ["status"],
      },
    ],
  });

  User.prototype.comparePassword = function (password) {
    // eslint-disable-line func-names
    return Bluebird.resolve()
      .then(() => bcrypt.compareSync(password, this.password))
      .catch((err) => {
        console.log(err);

        return false;
      });
  };

  User.addHook("beforeSave", (user) => {
    user.name = _.trim(user.name);

    if (
      user.previous("password") !== user.password &&
      !_.isEmpty(user.password)
    ) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
    }
    return user;
  });

  return User;
};
