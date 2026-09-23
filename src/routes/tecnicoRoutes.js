const express = require('express');
const TecnicoController = require('../controllers/TecnicoController');

const router = express.Router();

router.get('/', TecnicoController.getAll);

module.exports = router;
