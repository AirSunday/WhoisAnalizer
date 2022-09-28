module.exports = (sequelize, Sequelize) => {
    const Whoisdb = sequelize.define("whoisdb", {
      domain_name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      release_date: {
        type: Sequelize.DATE
      },
      ns_servers: {
        type: Sequelize.STRING
      },
      registrant: {
        type: Sequelize.INTEGER
      },
    },
    {
      timestamps: false,
    }
    );
    return Whoisdb;
  };