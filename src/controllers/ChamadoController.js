const ChamadoService = require('../services/chamadoService');

function getStatus(error, defaultStatus) {
  return error.message.includes('não encontrad') ? 404 : defaultStatus;
}

class ChamadoController {
  static async getAll(req, res) {
    try {
      const chamados = await ChamadoService.getAllChamados();
      res.json(chamados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const chamado = await ChamadoService.getChamadoById(id);
      res.json(chamado);
    } catch (error) {
      res.status(getStatus(error, 500)).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const id = await ChamadoService.createChamado(req.body || {});
      res.status(201).json({ message: 'Chamado criado com sucesso.', id });
    } catch (error) {
      res.status(getStatus(error, 400)).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      await ChamadoService.updateChamado(id, req.body || {});
      res.json({ message: 'Chamado atualizado com sucesso.' });
    } catch (error) {
      res.status(getStatus(error, 400)).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await ChamadoService.deleteChamado(id);
      res.json({ message: 'Chamado deletado com sucesso.' });
    } catch (error) {
      res.status(getStatus(error, 400)).json({ error: error.message });
    }
  }
}

module.exports = ChamadoController;
