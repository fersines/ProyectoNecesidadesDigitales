CREATE DATABASE  IF NOT EXISTS `trabajo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trabajo`;
-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: trabajo
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accion`
--

DROP TABLE IF EXISTS `accion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accion` (
  `id_acc` int NOT NULL AUTO_INCREMENT,
  `id_usu_acc` int NOT NULL,
  `id_ser_acc` int NOT NULL,
  `accion_acc` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_acc`),
  KEY `accion_id_usu_acc_fk1` (`id_usu_acc`),
  KEY `accion_id_ser_acc_fk2` (`id_ser_acc`),
  CONSTRAINT `accion_id_ser_acc_fk2` FOREIGN KEY (`id_ser_acc`) REFERENCES `servicios` (`id_ser`) ON DELETE CASCADE,
  CONSTRAINT `accion_id_usu_acc_fk1` FOREIGN KEY (`id_usu_acc`) REFERENCES `usuarios` (`id_usu`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accion`
--

LOCK TABLES `accion` WRITE;
/*!40000 ALTER TABLE `accion` DISABLE KEYS */;
/*!40000 ALTER TABLE `accion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `id_com` int NOT NULL AUTO_INCREMENT,
  `id_ser_acc` int NOT NULL,
  `titulo_com` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_ini_com` datetime NOT NULL,
  `comentario_com` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_com`),
  KEY `comentarios_id_ser_acc_fk1` (`id_ser_acc`),
  CONSTRAINT `comentarios_id_ser_acc_fk1` FOREIGN KEY (`id_ser_acc`) REFERENCES `hacer` (`id_hac`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ficheros`
--

DROP TABLE IF EXISTS `ficheros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ficheros` (
  `id_fich` int NOT NULL AUTO_INCREMENT,
  `ruta_solucion` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ruta_solucionar` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_fich`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ficheros`
--

LOCK TABLES `ficheros` WRITE;
/*!40000 ALTER TABLE `ficheros` DISABLE KEYS */;
/*!40000 ALTER TABLE `ficheros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hacer`
--

DROP TABLE IF EXISTS `hacer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hacer` (
  `id_hac` int NOT NULL AUTO_INCREMENT,
  `id_ser_hac` int NOT NULL,
  `id_com_hac` int NOT NULL,
  PRIMARY KEY (`id_hac`),
  KEY `hacer_id_ser_hac_fk1` (`id_ser_hac`),
  KEY `hacer_id_com_hac_fk2` (`id_com_hac`),
  CONSTRAINT `hacer_id_com_hac_fk2` FOREIGN KEY (`id_com_hac`) REFERENCES `comentarios` (`id_com`) ON DELETE CASCADE,
  CONSTRAINT `hacer_id_ser_hac_fk1` FOREIGN KEY (`id_ser_hac`) REFERENCES `servicios` (`id_ser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hacer`
--

LOCK TABLES `hacer` WRITE;
/*!40000 ALTER TABLE `hacer` DISABLE KEYS */;
/*!40000 ALTER TABLE `hacer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id_ser` int NOT NULL AUTO_INCREMENT,
  `nombre_fich_ser` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_ser_acc` int NOT NULL,
  `iniciado_ser` bit(1) DEFAULT NULL,
  `expli_ser` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `solucionado_ser` bit(1) DEFAULT NULL,
  `fecha_fich_ini` datetime DEFAULT NULL,
  `titulo_ser` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_ser`),
  KEY `servicios_id_ser_acc_fk1` (`id_ser_acc`),
  CONSTRAINT `servicios_id_ser_acc_fk1` FOREIGN KEY (`id_ser_acc`) REFERENCES `accion` (`id_acc`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usu` int NOT NULL AUTO_INCREMENT,
  `nomFoto_usu` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nomUsuario_usu` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom_usu` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ape1_usu` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ape2_usu` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biografia_usu` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dni_usu` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_usu`),
  UNIQUE KEY `nomFoto_usu` (`nomFoto_usu`),
  UNIQUE KEY `nomUsuario_usu` (`nomUsuario_usu`),
  UNIQUE KEY `dni_usu` (`dni_usu`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-04 11:21:03
