const express = require('express');
const router = express.Router();
const controller= require('../controllers/voter.controller');

// router.post('/create', controller.createVoter);
// router.get('/get/:id', controller.get);
router.get('', controller.getAll);
// router.put('/edit', controller.edit);

module.exports = router;