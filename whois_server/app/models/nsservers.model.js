module.exports = (sequelize, Sequelize) => {
  const Nsserversdb = sequelize.define(
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
      registrant: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
  return Nsserversdb;
};
