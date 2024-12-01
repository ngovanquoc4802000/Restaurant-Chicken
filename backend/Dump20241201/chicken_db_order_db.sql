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
-- Table structure for table `order_db`
--

DROP TABLE IF EXISTS `order_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_db` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `customer_note` varchar(128) NOT NULL,
  `customer_name` varchar(128) NOT NULL,
  `total_price` decimal(5,2) NOT NULL,
  `customer_phone` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_db`
--

LOCK TABLES `order_db` WRITE;
/*!40000 ALTER TABLE `order_db` DISABLE KEYS */;
INSERT INTO `order_db` VALUES (1,'89ssssA/3Aa2a','nhanahssqjsq','okau2222',243.00,'23223232'),(2,'48B/1','number không gì anh la','ngovanquoc',54.00,'0978285940'),(4,'48B/1','number không gì anh la','ngovanquoc',54.00,'0978285940'),(5,'48B/1','sssssssssss','vothithuyduong',54.00,'0978285940'),(6,'78A/4A','122434','6sqsqsqs',56.00,'0978285940'),(7,'78A/4A','122434','6sqsqsqs',56.00,'0978285940'),(8,'78A/4A','122434','6sqsqsqs',56.00,'0978285940'),(9,'78A/4A','122434','6sqsqsqs',56.00,'0978285940'),(10,'78A/4A','122434','6sqsqsqs',56.00,'0978285940'),(11,'78A/4A','122434','6sqsqsqs',56.00,'0978285940'),(12,'78A/4A','122434','6sqsqsqs',56.00,'0978285940'),(13,'78A/4A','122434','6sqsqsqs',56.00,'0978285940'),(14,'78A/4A','122434','6sqsqsqs',56.00,'0978285940');
/*!40000 ALTER TABLE `order_db` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01  9:48:54
