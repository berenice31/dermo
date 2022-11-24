//? _____________on récupère les fichiers________________
const express = require('express');
const mainController = require('./controllers/mainController');

const router = express.Router();
router.get('/', mainController.homepage);


module.exports = router;