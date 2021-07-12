module.exports = (sequelize, type) => {
  return sequelize.define('person', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: type.STRING,
    email: type.STRING,
    firstName: type.STRING,
    lastName: type.STRING,
  });
};
