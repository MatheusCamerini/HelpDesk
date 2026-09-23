const db = require('../config/database');

class CategoriaModel {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM CATEGORIAS');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM CATEGORIAS WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = CategoriaModel;
