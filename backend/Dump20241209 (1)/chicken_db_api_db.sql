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
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_db`
--

LOCK TABLES `api_db` WRITE;
/*!40000 ALTER TABLE `api_db` DISABLE KEYS */;
INSERT INTO `api_db` VALUES (54,'2024-12-06T14-01-37.969Zaaa.png','ngô sqsq2323','22223333333333'),(65,'2024-12-06T08-14-57.724Zaaa.png','ngovanquocsq','22223333333333'),(66,'2024-12-06T13-42-23.073Z12.png.gif','ngovanquoc2sqsq','22223333333333sqsq'),(67,'2024-12-05T13-46-39.208Zaaa.png','ngovanquoc','ngdwdww'),(80,'2024-12-07T02-11-59.152Z321.png','ngovanquoc','hdyd'),(81,'2024-12-07T02-12-11.367Z2.png','ngovanquoc','22223333333333'),(82,'2024-12-07T02-12-24.322Zaaaaa.png','ngovanquoc','22223333333333'),(83,'2024-12-07T02-12-45.821Z3.png','ngovanquoc12222222','huhuhuhu'),(84,'2024-12-07T02-12-58.934Z2.png','ngô văn quốc111','22223333333333'),(85,'2024-12-07T05-06-55.447Zaaa.png','ngovanquoc','ngdwdww'),(86,'2024-12-07T07-43-43.718Z12.png.gif','ngô văn quốc111222','22223333333333'),(87,'2024-12-07T07-44-04.089Zaaa.png','ngô văn quốc111','âssasas'),(88,'2024-12-07T07-44-15.926Zaaaaa.png','ngovanquoc','22223333333333'),(89,'2024-12-07T07-47-08.612Z2.png','ngô văn quốc111222','1111111111111111'),(90,'2024-12-07T08-21-40.480Z1.png','ngô văn quốc111222','22223333333333'),(91,'2024-12-08T03-23-07.320Z3.png','ngovanquoc','1111111111111111111'),(92,'2024-12-08T03-23-49.087Z3.png','ngô văn quốc111','ngam=ngj-sj-si-ki-'),(93,'2024-12-08T03-32-01.013Zaaaaa.png','dwkdwkj','dkwjkdwjk'),(94,'2024-12-08T03-32-12.013Zaaaaa.png','ngovanquoc','ngdwdww'),(95,'2024-12-08T03-32-23.748Zaaaaa.png','ngovanquoc','22223333333333'),(96,'2024-12-08T03-32-44.141Z12.png.gif','dwkdwkj','22223333333333');
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

-- Dump completed on 2024-12-09 17:24:56
