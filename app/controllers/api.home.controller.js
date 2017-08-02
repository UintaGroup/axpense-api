let express = require('express');
let router = express.Router();

module.exports = app => {
    app.use('/api', router);
};

router.get('/', (req, res, next) => {
    res.json({message: 'Generator-Express MVC'});
});
