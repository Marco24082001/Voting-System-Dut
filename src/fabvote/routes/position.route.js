const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/authmiddleware");
const controller= require("../controllers/position.controller");

router.post("", validateToken, controller.createPosition);
router.get("/:id", validateToken, controller.get);
router.get("", validateToken, controller.getAll);
router.put("", validateToken, controller.edit);
router.delete("/:id", validateToken, controller.delete);

module.exports = router;