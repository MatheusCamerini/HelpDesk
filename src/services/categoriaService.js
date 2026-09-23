const CategoriaModel = require('../models/CategoriaModel');

class CategoriaService {
  static async getAllCategorias() {
    return await CategoriaModel.findAll();
  }
}

module.exports = CategoriaService;
