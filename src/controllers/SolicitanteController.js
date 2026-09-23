const SolicitanteService = require('../services/solicitanteService');

class SolicitanteController {
  static async getAll(req, res) {
    try {
      const solicitantes = await SolicitanteService.getAllSolicitantes();
      res.json(solicitantes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const solicitante = await SolicitanteService.getSolicitanteById(id);
      res.json(solicitante);
    } catch (error) {
      const status = error.message.includes('não encontrado') ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const id = await SolicitanteService.createSolicitante(req.body);
      res.status(201).json({ message: 'Solicitante criado com sucesso.', id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      await SolicitanteService.updateSolicitante(id, req.body);
      res.json({ message: 'Solicitante atualizado com sucesso.' });
    } catch (error) {
      const status = error.message.includes('não encontrado') ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await SolicitanteService.deleteSolicitante(id);
      res.json({ message: 'Solicitante deletado com sucesso.' });
    } catch (error) {
      const status = error.message.includes('não encontrado') ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  }
}

module.exports = SolicitanteController;
