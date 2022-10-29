const express = require('express');
const router = express.Router();
const controller= require('../controllers/candidate.controller');

router.get('/all', controller.getAll);
router.post('/create', controller.create);

// router.post('/get', controller.get);
module.exports = router;