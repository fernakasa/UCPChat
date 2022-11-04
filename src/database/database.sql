CREATE DATABASE chat;
USE chat;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'postgis';
-- FLUSH PRIVILEGES;

CREATE TABLE Sala(
	salaId 		INT(11) 	    NOT NULL    AUTO_INCREMENT,
    salaNombre 	VARCHAR(45)	    NOT NULL    UNIQUE,
    PRIMARY KEY(salaId)
);

CREATE TABLE Usuario(
	usuarioId 		INT(11)			NOT NULL    AUTO_INCREMENT,
    usuarioNombre 	VARCHAR(45)		NOT NULL    UNIQUE,
    passwordHash	VARCHAR(256)	NOT NULL,
    passwordSalt	VARCHAR(256)	NOT NULL,
    PRIMARY KEY(usuarioId)
);

CREATE TABLE Mensaje(
	mensajeId	    INT			NOT NULL    AUTO_INCREMENT,
    mensajeDate	    DATETIME	NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    mensajeCont	    TEXT 		NOT NULL,
    salaId 		    INT(11) 	NOT NULL,
    usuarioId 	    INT(11)		NOT NULL,
    referenciaId    INT         NULL,
    PRIMARY KEY(mensajeId),
    FOREIGN KEY(salaId)         REFERENCES  Sala(salaId),
    FOREIGN KEY(usuarioId)	    REFERENCES	Usuario(usuarioId),
    FOREIGN KEY(referenciaId)	REFERENCES	Mensaje(mensajeId)
);

INSERT INTO Sala(salaNombre) VALUES('Lobby');