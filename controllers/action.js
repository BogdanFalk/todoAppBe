const { Action } = require('../services/herokuMariaDB.js');
var _ = require('lodash');
const { check } = require('express-validator');

function actionAPIs(app) {
  app.post(
    '/action',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('isDone', 'isDone is required').not().isEmpty(),
      check('personId', 'personId is required').not().isEmpty(),
    ],
    (req, res) => {
      const { name, isDone, personId } = req.body;

      let send = false;
      let availableParameters = ['name', 'isDone', 'personId'];
      Object.keys(req.body).length < 1
        ? res
            .status(200)
            .send(
              `An invalid parameter was provided! Available parameters are ${availableParameters}`
            )
        : null;
      if (req.body) {
        Object.keys(req.body).forEach((param) => {
          if (
            !availableParameters.find(
              (availableParam) => availableParam === param
            )
          ) {
            send = true;
            res
              .status(200)
              .send(
                `An invalid parameter was provided! Available parameters are ${availableParameters}`
              );
          }
        });
      }
      if (!send) {
        if (
          name === null ||
          isDone === null ||
          personId === null ||
          name === undefined ||
          personId === undefined ||
          isDone === undefined
        ) {
          res
            .status(200)
            .send(
              `One or more parameters are either null or undefined. all: ${availableParameters} are required.`
            );
        } else {
          newAction = {};
          newAction.name = name;
          newAction.isDone = isDone;
          newAction.personId = personId;

          try {
            Action.create(newAction).then((action) => {
              res.status(200).send(action);
            });
          } catch (err) {
            console.log('Creating Action Failed');
            res.status(400).json({
              error: err,
            });
          }
        }
      }
    }
  );

  app.put('/action', (req, res) => {
    const { id, isDone } = req.body;

    let availableParameters = ['id', 'isDone'];
    if (
      id === null ||
      isDone === null ||
      id === undefined ||
      isDone === undefined
    ) {
      res
        .status(403)
        .send(
          `One or more parameters are either null or undefined. all: ${availableParameters} are required.`
        );
    } else
      try {
        Action.findOne({ where: { id: id } }).then((action) => {
          action.isDone = isDone;
          action.save().then((action) => {
            res.status(200).send(action);
          });
        });
      } catch (error) {
        res.status(400).json({ error: err });
      }
  });

  app.delete('/action', (req, res) => {
    const { id } = req.body;

    console.log("Delete id:",id);
    let availableParameters = ['id'];
    if (id === null || id === undefined || id === NaN) {
      console.log(`One or more parameters are either null or undefined. ${availableParameters} is required as a number.`)
      res
        .status(403)
        .send(
          `One or more parameters are either null or undefined. ${availableParameters} is required as a number.`
        );
    } else
      try {
        Action.destroy({ where: { id: id } }).then((actions) => {
          if (actions > 0) res.status(200).send('Action deleted');
          else res.status(200).send("Action doesn't exist!");
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({
          error: err,
        });
      }
  });

  app.post('/actionsOfUser', (req, res) => {
    const { personId } = req.body;

    let availableParameters = ['personId'];
    if (personId === null || personId === undefined || personId === NaN) {
      res
        .status(403)
        .send(
          `One or more parameters are either null or undefined. ${availableParameters} is required as a number.`
        );
    } else
      try {
        Action.findAll({ where: { personId: personId } }).then((actions) => {
          if (actions.length > 0) res.status(200).send(actions);
          else res.status(200).send({});
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({
          error: err,
        });
      }
  });
}

module.exports = {
  actionAPIs,
};
