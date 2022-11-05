const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/authmiddleware");
const controller= require("../controllers/ballot.controller");

router.get("/get-all-ballots", validateToken, controller.getAllBallots);
router.get("/get-ballots-for-voter/:id", validateToken, controller.getBallotsForVoter);
router.post("/submit-ballots", validateToken, controller.submitBallots);
module.exports = router;