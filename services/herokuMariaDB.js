const personModel = require('../models/person.js');
const actionModel = require('../models/action.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'mysql://bc4c17b873880c:74979cd5@eu-cdbr-west-01.cleardb.com/heroku_4d0413abde514ce',
  {
    sync: { force: false },
  }
);

var Person = personModel(sequelize, Sequelize);
var Action = actionModel(sequelize, Sequelize);

Person.hasMany(Action, { as: 'actions' });

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

function testConnection() {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.err('Unable to connect to the database:' + err.toString());
    });
}

module.exports = {
  testConnection,
  Person,
  Action,
};
