const express = require('express');
const { validateToken } = require("../middlewares/authmiddleware");
const router = express.Router();
const controller= require('../controllers/election.controller');

router.get('', validateToken, controller.getAll);
router.put('', validateToken, controller.edit);
router.get('/reset', validateToken, controller.reset);


module.exports = router;