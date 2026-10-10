USE helpdesk_db;

INSERT INTO CATEGORIAS (nome, descricao) VALUES
('Hardware', 'Problemas relacionados a equipamentos fisicos, como computadores e impressoras'),
('Software', 'Problemas relacionados a programas e sistemas instalados'),
('Rede', 'Problemas relacionados a conexao de internet e rede interna'),
('Acesso', 'Problemas relacionados a login, senha e permissoes de acesso a sistemas');

INSERT INTO TECNICOS (nome, email) VALUES
('Carlos Silva', 'carlos.silva@helpdesk.com'),
('Fernanda Lima', 'fernanda.lima@helpdesk.com'),
('Rafael Costa', 'rafael.costa@helpdesk.com');

INSERT INTO SOLICITANTES (nome, email, setor) VALUES
('Ana Souza', 'ana.souza@empresa.com', 'Financeiro'),
('Bruno Alves', 'bruno.alves@empresa.com', 'Recursos Humanos'),
('Camila Rocha', 'camila.rocha@empresa.com', 'Comercial');

INSERT INTO CHAMADOS (titulo, descricao, prioridade, status, solucao, solicitante_id, categoria_id, tecnico_id) VALUES
('Computador não liga', 'O computador do posto de trabalho não acende após falha de energia.', 'ALTA', 'CONCLUIDO', 'Substituição da fonte de alimentação.', 1, 1, 1),
('Erro ao abrir o software de gestão', 'O aplicativo fecha sozinho ao tentar gerar relatórios.', 'MEDIA', 'EM_ATENDIMENTO', NULL, 2, 2, 2),
('Falha na rede sem fios', 'Os computadores do setor comercial perderam o acesso à internet.', 'ALTA', 'ABERTO', NULL, 3, 3, 3),
('Redefinição de palavra-passe', 'Utilizador necessita de redefinir a palavra-passe de acesso ao sistema.', 'BAIXA', 'CONCLUIDO', 'Palavra-passe temporária enviada por correio eletrónico.', 1, 4, 1);