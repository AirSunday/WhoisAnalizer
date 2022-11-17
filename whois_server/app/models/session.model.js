module.exports = (sequelize, Sequelize) => {
  const mappings = {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000),
  };

  const Session = sequelize.define('sessionsdbs', mappings, {
    indexes: [
      {
        name: 'session_sid_index',
        method: 'BTREE',
        fields: ['sid'],
      },
    ],
  });
  return Session;
}