module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
      "nsserversdb",
      {
        nsserver_id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          unique: true,
          type: Sequelize.STRING,
        },
        count: {
          type: Sequelize.INTEGER,
        },
      },
      {
        timestamps: false,
      }
    );
  };