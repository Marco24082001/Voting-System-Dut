const express = require('express');
const router = express.Router();
const { validateToken } = require("../middlewares/authmiddleware");
const controller= require('../controllers/common.controller');

router.get("/history/:id", validateToken, controller.get);
module.exports = router;