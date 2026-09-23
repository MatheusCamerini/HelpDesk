const TecnicoService = require('../services/tecnicoService');

class TecnicoController {
  static async getAll(req, res) {
    try {
      const tecnicos = await TecnicoService.getAllTecnicos();
      res.json(tecnicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TecnicoController;
