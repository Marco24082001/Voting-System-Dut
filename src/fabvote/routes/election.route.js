const express = require('express');
const router = express.Router();
const controller= require('../controllers/election.controller');

router.get('', controller.getAll);
router.put('', controller.edit);
router.get('/reset', controller.reset);


module.exports = router;