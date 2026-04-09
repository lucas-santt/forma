CREATE TABLE user (
    user_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
);

CREATE TABLE archive (
    archive_id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE elemento (
    elemento_id INTEGER PRIMARY KEY,
    titulo TEXT NOT NULL,
    conteudo_texto TEXT,
    imagem_caminho TEXT,
    citation_id INTEGER,
    archive_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (archive_id) REFERENCES archive(archive_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (citation_id) REFERENCES archive(archive_id)
);

CREATE TABLE favorite (
    favorite_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    archive_id INTEGER,
    elemento_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (archive_id) REFERENCES archive_id(archive_id),
    FOREIGN KEY (elemento_id) REFERENCES elemento(elemento_id)
)