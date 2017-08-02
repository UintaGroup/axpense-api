let express = require('express');
let router = express.Router();
let Category = require('../models/category');


module.exports = app => {
  app.use('/api/categories', router);
};

router.get('/', (req, res, next) => {
  Category.find()
    .then(cats => {
      res.json(cats);
    })
    .catch(err => {
      console.error('ERROR', err);
      next(err);
    });
});

router.post('/', (req, res, next) => {

  req.sanitize('ledgerAccount').escape();
  req.sanitize('name').escape();
  req.sanitize('description').escape();

  let category = new Category(req.body);

  let errors = req.validationError;
  if (errors) {
    res.status(400)
      .json({error: errors});
  }
  else {
    category.save()
      .then(report => {
        res.json(report);
      })
      .catch(errors => {
        res.status(500)
          .json({error: errors});
      })
  }
});

router.delete('/', (req, res, next) => {
  // if(errors) {
  //   res.status(500)
  //     .json({error: errors});
  // } else {
  //   res.json({target: req.query})
  // }
  res.json({message: 'deleting: ' + req.query.id})
});
