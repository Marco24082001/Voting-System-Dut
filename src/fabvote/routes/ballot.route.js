const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/authmiddleware");
const controller= require("../controllers/ballot.controller");

router.get("/get-all-ballots", validateToken, controller.getAllBallots);
router.post("/submit-ballots", validateToken, controller.submitBallots);
module.exports = router;