const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', (req, res) => { res.send('Hello World');});

router.get('/users', usersController.getAll);
router.get('/users/:id', usersController.getSingle);

module.exports = router;