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
-- Table structure for table `order_table`
--

DROP TABLE IF EXISTS `order_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `customer_note` varchar(45) NOT NULL,
  `customer_name` varchar(45) NOT NULL,
  `customer_phone` varchar(45) NOT NULL,
  `total_price` decimal(10,3) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `paid` tinyint NOT NULL,
  `process` varchar(50) DEFAULT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_table`
--

LOCK TABLES `order_table` WRITE;
/*!40000 ALTER TABLE `order_table` DISABLE KEYS */;
INSERT INTO `order_table` VALUES (3,1,'123 Đường ABC, Phường XYZ, Quận nào đó','Giao hàng nhanh giúp tôi nhé!','Nguyễn Văn QUỐC','0901234567',42000.000,0,0,'Xử lý','2025-06-04 14:20:12','2025-06-04 14:20:12'),(4,2,'Thành phố Phan Rang-Tháp Chàm','phải giữ được độ nóng của gà','ngovanquoc','0978285940',255.000,0,0,'Xử lý','2025-06-05 09:34:42','2025-06-05 09:34:42'),(5,2,'Thành phố Phan Rang-Tháp Chàm','phải ngon','ngovanquoc','0978285940',510.000,0,0,'Đang chờ','2025-06-05 09:44:56','2025-06-05 09:44:56'),(6,2,'Thành phố Phan Rang-Tháp Chàm','gởi nhanh','ngovanquoc','0978285940',29.000,0,0,'Xử lý','2025-06-05 09:48:41','2025-06-05 09:48:41'),(7,2,'Thành phố Phan Rang-Tháp Chàm','gởi nhanh','ngovanquoc','0978285940',170.000,0,0,'Xử lý','2025-06-05 11:58:39','2025-06-05 11:58:39'),(8,10,'sai gòn quan 8','phốt phô mai nhiều cho mình nhen','nguyễn cao kỳ duyên ','0978285940',765.000,0,0,'Xử lý','2025-06-06 06:20:04','2025-06-06 06:20:04'),(9,10,'sai gòn quan 8','phải nóng giòn tan','nguyễn cao kỳ duyên ','0978285940',59.000,0,0,'Xử lý','2025-06-06 06:20:51','2025-06-06 06:20:51');
/*!40000 ALTER TABLE `order_table` ENABLE KEYS */;
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
