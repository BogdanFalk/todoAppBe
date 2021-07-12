module.exports = (sequelize, type) => {
  return sequelize.define('action', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
    isDone: type.BOOLEAN,
  });
};
