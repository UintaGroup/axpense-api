let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Article = mongoose.model('Article');

module.exports = app => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Article.find((err, articles) => {

    if (err) {
      return next(err);
    }

    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });

  });
});
