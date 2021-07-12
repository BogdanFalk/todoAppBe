const { Action } = require('../services/herokuMariaDB.js');

function actionAPIs(app) {
  app.post('/action', (req, res) => {
    const { name, isDone, personId } = req.body;
    newAction = {};
    newAction.name = name;
    newAction.isDone = isDone;
    newAction.personId = personId;
    try {
      Action.create(newAction);
      res.status(200).send(newAction);
    } catch (err) {
      console.err('Creating Action Failed');
      res.status(400).json({
        error: err,
      });
    }
  });

  app.post('/getUserActions', (req, res) => {
    const { personId } = req.body;
    try {
      Action.findAll({ where: { personId: personId } }).then((actions) => {
        if (actions.length > 0) res.status(200).send(actions);
        else res.status(200).send({});
      });
    } catch (error) {
      console.err(error);
      res.status(400).json({
        error: err,
      });
    }
  });

  app.delete('/userAction', (req, res) => {
    const { id } = req.body;
    try {
      Action.delete({ where: { id: id } }).then((actions) => {
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
}

module.exports = {
  actionAPIs,
};
