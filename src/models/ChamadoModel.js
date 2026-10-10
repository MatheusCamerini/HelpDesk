const db = require('../config/database');

const SELECT_CHAMADOS = `
  SELECT
    c.id,
    c.titulo,
    c.descricao,
    c.prioridade,
    c.status,
    c.solucao,
    c.criado_em,
    c.solicitante_id,
    s.nome AS solicitante_nome,
    s.setor AS solicitante_setor,
    c.categoria_id,
    cat.nome AS categoria_nome,
    c.tecnico_id,
    t.nome AS tecnico_nome
  FROM CHAMADOS c
  INNER JOIN SOLICITANTES s ON s.id = c.solicitante_id
  INNER JOIN CATEGORIAS cat ON cat.id = c.categoria_id
  LEFT JOIN TECNICOS t ON t.id = c.tecnico_id
`;

class ChamadoModel {
  static async findAll() {
    const [rows] = await db.query(`${SELECT_CHAMADOS} ORDER BY c.criado_em DESC, c.id DESC`);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(`${SELECT_CHAMADOS} WHERE c.id = ?`, [id]);
    return rows[0];
  }

  static async create(chamado) {
    const { titulo, descricao, prioridade, solicitante_id, categoria_id } = chamado;
    const [result] = await db.query(
      'INSERT INTO CHAMADOS (titulo, descricao, prioridade, status, solicitante_id, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
      [titulo, descricao, prioridade, 'ABERTO', solicitante_id, categoria_id]
    );
    return result.insertId;
  }

  static async update(id, chamado) {
    const { titulo, descricao, prioridade, status, solucao, categoria_id, tecnico_id } = chamado;
    const [result] = await db.query(
      'UPDATE CHAMADOS SET titulo = ?, descricao = ?, prioridade = ?, status = ?, solucao = ?, categoria_id = ?, tecnico_id = ? WHERE id = ?',
      [titulo, descricao, prioridade, status, solucao || null, categoria_id, tecnico_id || null, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM CHAMADOS WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = ChamadoModel;
