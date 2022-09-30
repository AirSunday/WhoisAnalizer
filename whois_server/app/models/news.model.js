module.exports = (sequelize, Sequelize) => {
    const Newsdb = sequelize.define("newsdb", {
        news_id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            unique: true,
            type: Sequelize.STRING
        },
        preview: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.TEXT
        },
    }
    );
    return Newsdb;
  };