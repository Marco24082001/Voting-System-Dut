const express = require('express');
const router = express.Router();
const { validateToken } = require("../middlewares/authmiddleware");
const controller= require('../controllers/vote.controller');
router.get('', validateToken, controller.getAll);

module.exports = router;