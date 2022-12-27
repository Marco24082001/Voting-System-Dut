const express = require('express');
const router = express.Router();
const { validateToken } = require("../middlewares/authmiddleware");
const controller= require('../controllers/candidate.controller');

router.post("", validateToken, controller.createCandidate);
router.get("/:id", validateToken, controller.get);
router.get("", validateToken, controller.getAll);
router.put("", validateToken, controller.edit);
router.delete("/:id", validateToken, controller.delete);

router.post("/upload", controller.upload);

module.exports = router;