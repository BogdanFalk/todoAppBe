const { personAPIs } = require(__dirname + '/controllers/person.js');
const { actionAPIs } = require(__dirname + '/controllers/action.js');

function setAPIs(app) {
  personAPIs(app);
  actionAPIs(app);
}

module.exports = {
  setAPIs,
};
