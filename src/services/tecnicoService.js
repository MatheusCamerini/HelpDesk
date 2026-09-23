const TecnicoModel = require('../models/TecnicoModel');

class TecnicoService {
  static async getAllTecnicos() {
    return await TecnicoModel.findAll();
  }
}

module.exports = TecnicoService;
