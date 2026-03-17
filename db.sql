CREATE TABLE usuario (
    usuario_id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    senha TEXT NOT NULL,
    bio TEXT
);

CREATE TABLE archive (
    archive_id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    usuario_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id)
);

CREATE TABLE elemento (
    elemento_id INTEGER PRIMARY KEY,
    titule TEXT NOT NULL,
    conteudo_texto TEXT,
    imagem_caminho TEXT,
    citation_id INTEGER,
    archive_id INTEGER,
    usuario_id INTEGER,
    FOREIGN KEY (archive_id) REFERENCES archive(archive_id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id),
    FOREIGN KEY (citation_id) REFERENCES archive(archive_id)
);