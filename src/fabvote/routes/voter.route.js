const express = require('express');
const router = express.Router();
const controller= require('../controllers/voter.controller');
const { validateToken } = require("../middlewares/authmiddleware");

router.get('', validateToken, controller.getAll);
router.post('', validateToken, controller.createVoter);
router.delete('/:id', validateToken, controller.delete)
router.put('/:id', validateToken, controller.edit);
router.get('/verify', controller.verify);

module.exports = router;