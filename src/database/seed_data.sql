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
