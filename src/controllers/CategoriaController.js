const CategoriaService = require('../services/categoriaService');

class CategoriaController {
  static async getAll(req, res) {
    try {
      const categorias = await CategoriaService.getAllCategorias();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CategoriaController;
