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
-- Table structure for table `user_db`
--

DROP TABLE IF EXISTS `user_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_db` (
  `Email` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_db`
--

LOCK TABLES `user_db` WRITE;
/*!40000 ALTER TABLE `user_db` DISABLE KEYS */;
INSERT INTO `user_db` VALUES ('ngovanquocdeptrai@gmail.com','ngovan','777777',1,'89A/3Aaaaa','2024-11-08 14:09:25'),('aaaaa@gmail.com','ngovan','2323232',8,'89A/3A','2024-11-08 14:09:25'),('aaaaa@gmail.com','ngovan','2323232',9,'89A/3A','2024-11-08 14:09:25'),('aaaaa@gmail.com','ngovan','452',10,'89A/3A','2024-11-08 14:09:25'),('ngovanquoc480@gmail.com','ngovanquoc','123456',13,'Thành phố Phan Rang-Tháp Chàm','2024-11-09 03:57:14'),('ngovanquoc480@gmail.com','ngovanquoc','123456',14,'Thành phố Phan Rang-Tháp Chàm','2024-11-09 04:30:12'),('ngovanquoc@gmail.com','sqssssq','80201cecb0c436c9e6b1c86a3792ef64',17,'89A/3A','2024-11-21 02:06:15'),('ngovanquoc480@gmail.com','ngovanquoc','202cb962ac59075b964b07152d234b70',18,'Thành phố Phan Rang-Tháp Chàm','2024-11-21 02:08:33'),('ngovanquoc480@gmail.com','ngovanquoc','827ccb0eea8a706c4c34a16891f84e7b',19,'Thành phố Phan Rang-Tháp Chàm','2024-11-21 02:13:12');
/*!40000 ALTER TABLE `user_db` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 14:16:28
