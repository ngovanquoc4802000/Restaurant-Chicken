-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: chicken_db
-- ------------------------------------------------------
-- Server version	8.4.2

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
-- Table structure for table `api_db`
--

DROP TABLE IF EXISTS `api_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_db` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `handle` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_db`
--

LOCK TABLES `api_db` WRITE;
/*!40000 ALTER TABLE `api_db` DISABLE KEYS */;
INSERT INTO `api_db` VALUES (26,'2024-11-19T09-24-59.568Zget.png','ngô văn quốc111','ngdwdww'),(27,'2024-11-19T09-26-25.727Zedit1.png','232','2323322332'),(28,'2024-11-19T09-26-37.396ZScreenshot 2024-10-30 062913.png','123','ngdwdww'),(29,'2024-11-19T09-26-50.515Zs5.png','ngô văn quốc111222','âssasas'),(30,'2024-11-19T09-27-04.981Zedit3.png','ngô văn quốc111222','ngdwdww'),(31,'2024-11-19T09-27-13.900Ze1.png','ngô văn quốc111222','ngdwdww'),(32,'2024-11-19T09-27-27.951Zedit3.png','ngô văn quốc111222','22223333333333'),(33,'2024-11-19T17-18-53.086Zedit2.png','ngô văn quốc111222','ngdwdww'),(34,'2024-11-20T06-47-59.415Zedit2.png','ngô văn quốc111222','ngdwdww'),(35,'2024-11-30T06-57-00.637Zaaa.png','ngovanquoc','ngdwdww');
/*!40000 ALTER TABLE `api_db` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01  9:48:53
