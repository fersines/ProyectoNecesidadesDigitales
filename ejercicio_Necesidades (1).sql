CREATE DATABASE IF NOT EXISTS trabajo CHARACTER SET="utf8mb4" COLLATE="utf8mb4_unicode_ci";

USE trabajo;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usu INTEGER AUTO_INCREMENT PRIMARY KEY,
	nomFoto_usu VARCHAR(50) unique NOT NULL,
	nomUsuario_usu VARCHAR(50) unique NOT NULL,
    nom_usu VARCHAR(50) NOT NULL,
	ape1_usu VARCHAR(50) NOT NULL,
	ape2_usu VARCHAR(50) NOT NULL,
	biografia_usu VARCHAR(50),
    dni_usu VARCHAR(50) unique NOT NULL ,
    mail VARCHAR(50) unique NOT NULL
)  ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS accion (
	id_acc INTEGER AUTO_INCREMENT PRIMARY KEY,
    id_usu_acc INTEGER NOT NULL,
    id_ser_acc INTEGER NOT NULL,
    accion_acc VARCHAR(1) NOT NULL,
	CONSTRAINT accion_id_usu_acc_fk1
    FOREIGN KEY (id_usu_acc) REFERENCES usuarios(id_usu) ON DELETE CASCADE,
	CONSTRAINT accion_id_ser_acc_fk2
    FOREIGN KEY (id_ser_acc) REFERENCES servicios(id_ser) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS servicios (
    id_ser INTEGER AUTO_INCREMENT PRIMARY KEY,
	nombre_fich_ser varchar(50) NOT NULL,
    id_ser_acc INTEGER NOT NULL,
    iniciado_ser bit,
    expli_ser VARCHAR(150),
    solucionado_ser bit,
    fecha_fich_ini DATETIME,
    titulo_ser VARCHAR(50),
    
    CONSTRAINT servicios_id_ser_acc_fk1
    FOREIGN KEY (id_ser_acc) REFERENCES accion(id_acc) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS hacer (
	id_hac INTEGER AUTO_INCREMENT PRIMARY KEY,
    id_ser_hac INTEGER NOT NULL,
    id_com_hac INTEGER NOT NULL,
    CONSTRAINT hacer_id_ser_hac_fk1
    FOREIGN KEY (id_ser_hac) REFERENCES servicios(id_ser) ON DELETE CASCADE,
    CONSTRAINT hacer_id_com_hac_fk2
    FOREIGN KEY (id_com_hac) REFERENCES comentarios(id_com) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS comentarios (
    id_com INTEGER AUTO_INCREMENT PRIMARY KEY,
	id_ser_acc INTEGER NOT NULL,
    titulo_com VARCHAR(50) NOT NULL,
    fecha_ini_com DATETIME NOT NULL,
    comentario_com VARCHAR(250) NOT NULL,
    
    CONSTRAINT comentarios_id_ser_acc_fk1
    FOREIGN KEY (id_ser_acc) REFERENCES hacer(id_hac) ON DELETE CASCADE
) ENGINE=INNODB;

