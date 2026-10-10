const express = require('express');
const ChamadoController = require('../controllers/ChamadoController');

const router = express.Router();

router.get('/', ChamadoController.getAll);
router.get('/:id', ChamadoController.getById);
router.post('/', ChamadoController.create);
router.put('/:id', ChamadoController.update);
router.delete('/:id', ChamadoController.delete);

module.exports = router;
