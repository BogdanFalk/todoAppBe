const { Person } = require('../services/herokuMariaDB.js');
const { Action } = require('../services/herokuMariaDB.js');
var passwordHash = require('password-hash');

function personAPIs(app) {
  app.get('/people', (req, res) => {
    Person.findAll().then((people) => res.json(people));
  });

  app.post('/person', (req, res) => {
    const { password, email, firstName, lastName } = req.body;
    Person.findOne({
      where: { email: email },
    }).then((person) => {
      if (person == null) {
        var hashPass = passwordHash.generate(password);
        newPerson = {};
        newPerson.password = hashPass;
        newPerson.email = email;
        newPerson.firstName = firstName;
        newPerson.lastName = lastName;
        try {
          Person.create(newPerson);
          res.status(200).send('Person Added!');
        } catch (err) {
          console.err('Creating Person Failed');
          res.status(400).json({
            error: err,
          });
        }
      } else {
        res.status(200).send('Email Already Registered!');
      }
    });
  });
}

module.exports = {
  personAPIs,
};
