const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));
router.use('/users', require('./users'));

router.get('/', (req, res) => {
  res.send('Welcome to CSE 341 Project 1 API! Access Swagger documentation at <a href="/api-docs">/api-docs</a>');
});

module.exports = router;
