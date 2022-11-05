const express = require('express');
const router = express.Router();
const controller= require('../controllers/vote.controller');

// router.post('/vote', controller.vote);
// router.get('/get/:id', controller.get);
// router.get('/getbyOwner/:ownerId', controller.getbyOwner);
// router.get('/getAll', controller.getAll);
router.get('', controller.getAll);
// router.get('/get')

module.exports = router;