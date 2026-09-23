const express = require('express');
const SolicitanteController = require('../controllers/SolicitanteController');

const router = express.Router();

router.get('/', SolicitanteController.getAll);
router.get('/:id', SolicitanteController.getById);
router.post('/', SolicitanteController.create);
router.put('/:id', SolicitanteController.update);
router.delete('/:id', SolicitanteController.delete);

module.exports = router;
