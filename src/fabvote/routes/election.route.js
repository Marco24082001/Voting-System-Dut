const express = require('express');
const router = express.Router();
const controller= require('../controllers/election.controller');

router.get('/get/:id', controller.get);
router.get('/getAll', controller.getAll);
router.put('/edit', controller.edit);

module.exports = router;