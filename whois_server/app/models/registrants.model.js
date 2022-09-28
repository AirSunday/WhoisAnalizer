module.exports = (sequelize, Sequelize) => {
    const Registrantsdb = sequelize.define("registrantsdb", {
        registrant_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            unique: true,
            type: Sequelize.STRING
        },
        count: {
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,
    },
    );
    return Registrantsdb;
  };