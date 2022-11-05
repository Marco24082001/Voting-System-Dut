const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/authmiddleware");
const controller= require("../controllers/position.controller");

router.post("/create", validateToken, controller.createPosition);
router.get("/get/:id", validateToken, controller.get);
router.get("/getAll", validateToken, controller.getAll);
router.put("/edit", validateToken, controller.edit);
router.delete("/delete/:id", validateToken, controller.delete);

module.exports = router;