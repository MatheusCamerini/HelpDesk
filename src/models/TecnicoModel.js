const db = require('../config/database');

class TecnicoModel {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM TECNICOS');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM TECNICOS WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = TecnicoModel;
