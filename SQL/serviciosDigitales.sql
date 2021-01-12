CREATE DATABASE IF NOT EXISTS serviciosDigitales CHARACTER SET="utf8mb4" COLLATE="utf8mb4_unicode_ci";

USE serviciosDigitales;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usu INT AUTO_INCREMENT,
	nomFoto_usu VARCHAR(50) UNIQUE NOT NULL,
	nomUsuario_usu VARCHAR(50) UNIQUE NOT NULL,
    nom_usu VARCHAR(50) NOT NULL,
	ape1_usu VARCHAR(50) NOT NULL,
	ape2_usu VARCHAR(50) NOT NULL,
	biografia_usu VARCHAR(50),
    dni_usu VARCHAR(50) UNIQUE NOT NULL ,
    mail VARCHAR(50) UNIQUE NOT NULL,
    CONSTRAINT usuarios_pk PRIMARY KEY (id_usu)

)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS servicios (
    id_ser INT AUTO_INCREMENT,
	nombre_fich_ser varchar(50) NOT NULL,
    iniciado_ser bit,
    expli_ser VARCHAR(150),
    solucionado_ser bit,
    fecha_fich_ini DATETIME,
    titulo_ser VARCHAR(50),
    
    CONSTRAINT servicios_pk PRIMARY KEY (id_ser)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS solucionar ( 
	id_sol INT AUTO_INCREMENT,
    id_usu_sol INT NOT NULL,
    id_ser_sol INT UNIQUE NOT NULL,
    CONSTRAINT solucionar1_pk PRIMARY KEY (id_sol),
    CONSTRAINT solucionar1_fk1 
		FOREIGN KEY(id_usu_sol) REFERENCES usuarios(id_usu) ON DELETE CASCADE,
	CONSTRAINT solucionar1_fk2
		FOREIGN KEY(id_ser_sol) REFERENCES servicios(id_ser) ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS solicitar ( 
	id_soli INT AUTO_INCREMENT,
    id_usu_soli INT NOT NULL,
    id_ser_soli INT UNIQUE NOT NULL,
    CONSTRAINT solicitar_pk PRIMARY KEY (id_soli),
    CONSTRAINT solicitar_fk1 
		FOREIGN KEY(id_usu_soli) REFERENCES usuarios(id_usu) ON DELETE CASCADE,
	CONSTRAINT solicitar_fk2
		FOREIGN KEY(id_ser_soli) REFERENCES servicios(id_ser) ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS comentar ( 
	id_co INT AUTO_INCREMENT,
    id_usu_co INT NOT NULL,
    id_ser_co INT NOT NULL,
    comentario VARCHAR(200),
    CONSTRAINT comentar_pk PRIMARY KEY (id_co),
    CONSTRAINT comentar_fk1 
		FOREIGN KEY(id_usu_co) REFERENCES usuarios(id_usu) ON DELETE CASCADE,
	CONSTRAINT comentar_fk2
		FOREIGN KEY(id_ser_co) REFERENCES servicios(id_ser) ON DELETE CASCADE
)ENGINE=INNODB;