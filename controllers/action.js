const { Action } = require('../services/herokuMariaDB.js');

function actionAPIs(app) {
  app.post('/action', (req, res) => {
    const { name, isDone, personId } = req.body;
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
  });

  app.put('/action', (req, res) => {
    const { id, isDone } = req.body;
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
