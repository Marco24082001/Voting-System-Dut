const express = require('express');
const router = express.Router();
const { validateToken } = require("../middlewares/authmiddleware");

const controller= require('../controllers/authentication.controller');

router.post('/login', controller.login);
router.get('/getCurrentUser', validateToken, controller.getCurrentUser);
module.exports = router;