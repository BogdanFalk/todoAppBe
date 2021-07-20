const { Person } = require('../services/herokuMariaDB.js');
var passwordHash = require('password-hash');

function personAPIs(app) {
  app.get('/people', (req, res) => {
    Person.findAll().then((people) => res.json(people));
  });

  app.post('/registerPerson', (req, res) => {

    const { password, email, firstName, lastName } = req.body;
    let availableParameters = ['password', 'email', 'firstName', 'lastName'];
    if (
      password === null ||
      email === null ||
      firstName === null ||
      lastName === null ||
      password === undefined ||
      email === undefined ||
      firstName === undefined ||
      lastName === undefined
    ) {
      res
        .status(403)
        .send(
          `One or more parameters are either null or undefined. all: ${availableParameters} are required.`
        );
    }
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
          Person.create(newPerson).then((person) => {
            res.status(200).send(person);
          });
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

  app.post('/loginPerson', (req, res) => {
    const { email, password } = req.body;
    let availableParameters = ['password', 'email'];
    if (
      password === null ||
      email === null ||
      password === undefined ||
      email === undefined
    ) {
      res
        .status(403)
        .send(
          `One or more parameters are either null or undefined. all: ${availableParameters} are required.`
        );
    }
    try {
      Person.findOne({
        where: { email: email },
      }).then((person) => {
        if (person !== null) {
          isPasswordOk = passwordHash.verify(password, person.password);
          if (isPasswordOk) {
            res.status(200).send(person);
          } else {
            res.status(200).send('User or password incorrect!');
          }
        } else {
          res.status(200).send('User does not exist!');
        }
      });
    } catch (err) {
      logging.ERR('Logging User Failed');
      res.status(400).json({
        error: err,
      });
    }
  });
}

module.exports = {
  personAPIs,
};
