const ChamadoModel = require('../models/ChamadoModel');
const SolicitanteModel = require('../models/SolicitanteModel');
const CategoriaModel = require('../models/CategoriaModel');
const TecnicoModel = require('../models/TecnicoModel');

const PRIORIDADES = ['BAIXA', 'MEDIA', 'ALTA'];
const STATUS = ['ABERTO', 'EM_ATENDIMENTO', 'CONCLUIDO'];

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

function isValidId(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0 && !isBlank(value);
}

class ChamadoService {
  static async getAllChamados() {
    return await ChamadoModel.findAll();
  }

  static async getChamadoById(id) {
    const chamado = await ChamadoModel.findById(id);
    if (!chamado) {
      throw new Error('Chamado não encontrado.');
    }
    return chamado;
  }

  static async createChamado(dados) {
    const { titulo, descricao, solicitante_id, categoria_id } = dados;

    if (isBlank(titulo) || isBlank(descricao) || isBlank(solicitante_id) || isBlank(categoria_id)) {
      throw new Error('Os campos titulo, descricao, solicitante_id e categoria_id são obrigatórios.');
    }

    if (!isValidId(solicitante_id) || !isValidId(categoria_id)) {
      throw new Error('Os campos solicitante_id e categoria_id devem ser números inteiros positivos.');
    }

    const prioridade = isBlank(dados.prioridade) ? 'MEDIA' : String(dados.prioridade).trim().toUpperCase();
    if (!PRIORIDADES.includes(prioridade)) {
      throw new Error('Prioridade inválida. Valores permitidos: BAIXA, MEDIA ou ALTA.');
    }

    const solicitante = await SolicitanteModel.findById(solicitante_id);
    if (!solicitante) {
      throw new Error('Solicitante não encontrado.');
    }

    const categoria = await CategoriaModel.findById(categoria_id);
    if (!categoria) {
      throw new Error('Categoria não encontrada.');
    }

    return await ChamadoModel.create({
      titulo: String(titulo).trim(),
      descricao: String(descricao).trim(),
      prioridade,
      solicitante_id: Number(solicitante_id),
      categoria_id: Number(categoria_id)
    });
  }

  static async updateChamado(id, dados) {
    const atual = await ChamadoModel.findById(id);
    if (!atual) {
      throw new Error('Chamado não encontrado.');
    }

    const chamado = {
      titulo: dados.titulo !== undefined ? dados.titulo : atual.titulo,
      descricao: dados.descricao !== undefined ? dados.descricao : atual.descricao,
      prioridade: dados.prioridade !== undefined ? dados.prioridade : atual.prioridade,
      status: dados.status !== undefined ? dados.status : atual.status,
      solucao: dados.solucao !== undefined ? dados.solucao : atual.solucao,
      categoria_id: dados.categoria_id !== undefined ? dados.categoria_id : atual.categoria_id,
      tecnico_id: dados.tecnico_id !== undefined ? dados.tecnico_id : atual.tecnico_id
    };

    if (isBlank(chamado.titulo) || isBlank(chamado.descricao)) {
      throw new Error('Os campos titulo e descricao não podem ser vazios.');
    }

    chamado.prioridade = String(chamado.prioridade).trim().toUpperCase();
    if (!PRIORIDADES.includes(chamado.prioridade)) {
      throw new Error('Prioridade inválida. Valores permitidos: BAIXA, MEDIA ou ALTA.');
    }

    chamado.status = String(chamado.status).trim().toUpperCase();
    if (!STATUS.includes(chamado.status)) {
      throw new Error('Status inválido. Valores permitidos: ABERTO, EM_ATENDIMENTO ou CONCLUIDO.');
    }

    if (isBlank(chamado.tecnico_id)) {
      chamado.tecnico_id = null;
    } else {
      if (!isValidId(chamado.tecnico_id)) {
        throw new Error('O campo tecnico_id deve ser um número inteiro positivo.');
      }
      const tecnico = await TecnicoModel.findById(chamado.tecnico_id);
      if (!tecnico) {
        throw new Error('Técnico não encontrado.');
      }
      chamado.tecnico_id = Number(chamado.tecnico_id);
    }

    if (!isValidId(chamado.categoria_id)) {
      throw new Error('O campo categoria_id deve ser um número inteiro positivo.');
    }
    if (dados.categoria_id !== undefined) {
      const categoria = await CategoriaModel.findById(chamado.categoria_id);
      if (!categoria) {
        throw new Error('Categoria não encontrada.');
      }
    }
    chamado.categoria_id = Number(chamado.categoria_id);

    if (chamado.status === 'EM_ATENDIMENTO' && !chamado.tecnico_id) {
      throw new Error('Não é possível colocar o chamado em atendimento sem um técnico responsável.');
    }

    if (chamado.status === 'CONCLUIDO' && isBlank(chamado.solucao)) {
      throw new Error('Não é possível concluir o chamado sem informar a solução.');
    }

    chamado.titulo = String(chamado.titulo).trim();
    chamado.descricao = String(chamado.descricao).trim();
    chamado.solucao = isBlank(chamado.solucao) ? null : String(chamado.solucao).trim();

    await ChamadoModel.update(id, chamado);
    return true;
  }

  static async deleteChamado(id) {
    const deletedRows = await ChamadoModel.delete(id);
    if (deletedRows === 0) {
      throw new Error('Chamado não encontrado.');
    }
    return deletedRows;
  }
}

module.exports = ChamadoService;
