let express = require('express');
let router = express.Router();
let Report = require('../models/report');

module.exports = app => {
  app.use('/api/reports', router);
};

router.get('/', (req, res, next) => {
  Report.find()
    .then(x => {
      res.json(x);
    })
    .catch(err => {
      console.error('ERROR', err);
      next(err);
    });
});

router.post('/', (req, res, next) => {

  req.sanitize('created').escape();
  req.sanitize('startDate').escape();
  req.sanitize('endDate').escape();

  let report = new Report(req.body);

  let errors = req.validationError;
  if (errors) {
    res.status(500)
      .json({error: errors});
  }
  else {
    report.save()
      .then(report => {
        res.json(report);
      })
      .catch(errors => {
        res.status(500)
          .json({error: errors});
      })
  }
});
