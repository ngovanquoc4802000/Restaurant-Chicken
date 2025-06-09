-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: chicken_restaurant
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `address` varchar(255) NOT NULL,
  `password` varchar(45) NOT NULL,
  `create_at` datetime NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ngovanquoc','ronaldo321@gmail.com','0987654321','89A/3A','ad70f4bc1c44e7b2a395262d69272653','2025-06-04 21:15:12',1),(2,'ngovanquoc','ngovanquoc480@gmail.com','0978285940','Thành phố Phan Rang-Tháp Chàm','9007f6e9f7f3f8e607fc44340147a82b','2025-06-05 10:59:25',1),(3,'vothithuyduong','vothithuyduong01248@gmail.com','0352138400','My hai','322f390810ade59dd1548a4ca80956d4','2025-06-06 12:38:09',1),(4,'vothithuyduong','vothithuyduong01249@gmail.com','0352138400','Thành phố Phan Rang-Tháp Chàm','89f7e7e20809dbe2e805033fd742a6b7','2025-06-06 12:43:55',1),(5,'ngovanquoc','ronaldo123@gmail.com','0987654321','89A/3A','ad70f4bc1c44e7b2a395262d69272653','2025-06-06 12:44:50',1),(6,'vothithuyduong','vothithuyduong01250@gmail.com','0352138400','Thành phố Phan Rang-Tháp Chàm','c8837b23ff8aaa8a2dde915473ce0991','2025-06-06 12:48:43',1),(7,'vothithuyduong','vothithuyduong01251@gmail.com','0352138400','Thành phố Phan Rang-Tháp Chàm','fcea920f7412b5da7be0cf42b8c93759','2025-06-06 12:53:06',1),(8,'ngovanquoc','ngovanquoc481@gmail.com','0978285940','Thành phố Phan Rang-Tháp Chàm','e10adc3949ba59abbe56e057f20f883e','2025-06-06 13:04:06',1),(9,'Võ thị thùy dương ','vothithuyduong01252@gmail.com','0352138400','Thành phố Phan Rang-Tháp Chàm','e10adc3949ba59abbe56e057f20f883e','2025-06-06 13:06:54',1),(10,'Nguyễn Cao Kỳ Duyên ','nguyencaokyduyen42@gmail.com','0976723889','sai gòn quan 8','2c5decb18ceb2ed3431d497376f90591','2025-06-06 13:19:06',1),(11,'Nguyễn Trúc Thùy Tiên','nguyentructhuytien@gmail.com','0782372384','Quận 1 , HCM','e10adc3949ba59abbe56e057f20f883e','2025-06-07 16:21:08',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-09 10:57:31
