const SolicitanteModel = require('../models/SolicitanteModel');
const validateEmail = require('../utils/validateEmail');

class SolicitanteService {
  static async getAllSolicitantes() {
    return await SolicitanteModel.findAll();
  }

  static async getSolicitanteById(id) {
    const solicitante = await SolicitanteModel.findById(id);
    if (!solicitante) {
      throw new Error('Solicitante não encontrado.');
    }
    return solicitante;
  }

  static async createSolicitante(solicitante) {
    const { nome, email } = solicitante;

    if (!nome || !email) {
      throw new Error('Os campos nome e email são obrigatórios.');
    }

    if (!validateEmail(email)) {
      throw new Error('Formato de email inválido.');
    }

    const existingSolicitante = await SolicitanteModel.findByEmail(email);
    if (existingSolicitante) {
      throw new Error('Email já cadastrado.');
    }

    return await SolicitanteModel.create(solicitante);
  }

  static async updateSolicitante(id, solicitante) {
    const { nome, email } = solicitante;

    if (!nome || !email) {
      throw new Error('Os campos nome e email são obrigatórios.');
    }

    if (!validateEmail(email)) {
      throw new Error('Formato de email inválido.');
    }

    const solicitanteAtual = await SolicitanteModel.findById(id);
    if (!solicitanteAtual) {
      throw new Error('Solicitante não encontrado.');
    }

    const solicitanteComMesmoEmail = await SolicitanteModel.findByEmail(email);
    if (solicitanteComMesmoEmail && solicitanteComMesmoEmail.id !== Number(id)) {
      throw new Error('Email já cadastrado para outro solicitante.');
    }

    await SolicitanteModel.update(id, solicitante);
    return true;
  }

  static async deleteSolicitante(id) {
    const deletedRows = await SolicitanteModel.delete(id);
    if (deletedRows === 0) {
      throw new Error('Solicitante não encontrado.');
    }
    return deletedRows;
  }
}

module.exports = SolicitanteService;
