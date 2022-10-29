const express = require('express');
const router = express.Router();
const controller= require('../controllers/position.controller');

// router.get('/all', controller.getAll);
router.post('/create', controller.createPosition);
router.get('/get', controller.get);
router.get('/getAll', controller.getAll);

module.exports = router;