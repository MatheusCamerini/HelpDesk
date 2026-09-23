const db = require('../config/database');

class SolicitanteModel {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM SOLICITANTES');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM SOLICITANTES WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM SOLICITANTES WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(solicitante) {
    const { nome, email, setor } = solicitante;
    const [result] = await db.query(
      'INSERT INTO SOLICITANTES (nome, email, setor) VALUES (?, ?, ?)',
      [nome, email, setor || null]
    );
    return result.insertId;
  }

  static async update(id, solicitante) {
    const { nome, email, setor } = solicitante;
    const [result] = await db.query(
      'UPDATE SOLICITANTES SET nome = ?, email = ?, setor = ? WHERE id = ?',
      [nome, email, setor || null, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM SOLICITANTES WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = SolicitanteModel;
