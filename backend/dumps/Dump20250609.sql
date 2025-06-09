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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `handle` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Ưu đãi','uudai','https://static.kfcvietnam.com.vn/images/category/lg/KHUYEN%20MAI.jpg?v=LKwQDL',1),(2,'Món mới ','monmoi','https://static.kfcvietnam.com.vn/images/category/lg/MON%20MOI.jpg?v=LKwQDL',1),(3,'Combo 1 người ','combo1nguoi','https://static.kfcvietnam.com.vn/images/category/lg/COMBO%201%20NGUOI.jpg?v=LKwQDL',1),(4,'Combo Nhóm','combonhom','https://static.kfcvietnam.com.vn/images/category/lg/COMBO%20NHOM.jpg?v=LKwQDL',1),(5,'Gà Rán - Gà Quay','garangaquan','https://static.kfcvietnam.com.vn/images/category/lg/GA.jpg?v=LKwQDL',1),(6,'Burger - Cơm - Mì Ý','Burgercommiy','https://static.kfcvietnam.com.vn/images/category/lg/COM.jpg?v=LKwQDL',1),(7,'Thức Ăn Nhẹ ','thucannhe','https://static.kfcvietnam.com.vn/images/category/lg/MON%20AN%20NHE.jpg?v=LKwQDL',1),(8,'Thức Uống & Tráng Miệng','thucuongtrangmieng','https://static.kfcvietnam.com.vn/images/category/lg/TRANG%20MIENG.jpg?v=LKwQDL',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishlist`
--

DROP TABLE IF EXISTS `dishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `currency` varchar(45) NOT NULL,
  `price` decimal(10,3) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishlist`
--

LOCK TABLES `dishlist` WRITE;
/*!40000 ALTER TABLE `dishlist` DISABLE KEYS */;
INSERT INTO `dishlist` VALUES (1,1,'Combo Ngon Đỉnh','Ưu đãi - Combo Ngon Đỉnh','VND',85.000,'1 Miếng Gà + 1 Burger Tôm + 1 Ly Pepsi (tiêu chuẩn).',1,'2025-06-03 14:28:41','2025-06-03 14:28:41'),(2,2,'BURGER GÀ YO','Món mới - BURGER GÀ YO','VND',29.000,'1 phần Burger Gà Yo (cay)/1 phần Burger Gà Yo (không cay)',1,'2025-06-03 14:30:18','2025-06-03 14:30:18'),(3,3,'Combo 1 Miếng Gà','Combo 1 người - Combo 1 Miếng Gà','VND',59.000,'1 Miếng Gà Rán + 1 Khoai Tây Chiên (Vừa)/ 1 Khoai Tây Nghiền (Vừa) & 1 Bắp Cải Trộn (Vừa) + 1 Pepsi (Tiêu chuẩn) + 2 Gói tương (cà/ ớt)',1,'2025-06-03 14:42:24','2025-06-03 14:42:24'),(4,4,'Combo Nhóm 2 Hoàn Hảo','Combo Nhóm - Combo Nhóm 2 Hoàn Hảo','VND',135.000,'2 Miếng Gà Rán + 1 Burger Zinger + 2 Ly Pepsi (Tiêu chuẩn) + 3 Gói tương (cà/ ớt)',1,'2025-06-03 14:47:23','2025-06-03 14:47:23'),(5,6,'Burger Zinger','Burger - Burger Zinger','VND',54.000,'1 Burger Zinger +1 Gói tương (cà/ ớt)',1,'2025-06-03 14:48:34','2025-06-03 14:48:34'),(6,7,'Salad Hạt','Thức ăn nhẹ - Salad hạt','VND',39.000,'1 Salad Hạt',1,'2025-06-03 14:49:51','2025-06-03 14:49:51'),(7,8,'1 Bánh Trứng ','Thức Uống - Bánh Trứng','VND',18.000,'1 Bánh Trứng',1,'2025-06-03 14:51:18','2025-06-03 14:51:18'),(8,1,'Combo Vui Đỉnh','Ưu đãi - Combo Vui Đỉnh','VND',170.000,'3 Miếng Gà + 1 Mì Ý Gà Viên + 1 Khoai Tây Chiên (vừa) + 2 Ly Pepsi (tiêu chuẩn)',1,'2025-06-03 14:52:45','2025-06-03 14:52:45'),(9,1,'Combo Quẩy Đỉnh','Ưu đãi - Combo Quẩy Đỉnh','VND',255.000,'4 Miếng Gà + 1 Mì Ý Gà Viên + 1 Burger Tôm + 3 Miếng Gà Rán Tender + 3 Ly Pepsi (tiêu chuẩn)',1,'2025-06-03 14:53:28','2025-06-03 14:53:28'),(10,2,'COMBO YOLO','Món mới - COMBO YOLO','VND',59.000,'1 phần Burger Gà Yo + 1 Khoai Tây Chiên(vừa) + 1 Pepsi (vừa)',1,'2025-06-03 14:54:12','2025-06-03 14:54:12'),(11,2,'COMBO YO GIÒN','Món mới - COMBO YO GIÒN','VND',72.000,'1 phần Burger Gà Yo + 1 Miếng Gà + 1 Pepsi (vừa)',1,'2025-06-03 14:55:06','2025-06-03 14:55:06'),(12,2,'COMBO YO NO','Món mới - COMBO YO NO','VND',133.000,'1 phần Burger Gà Yo + 2 Miếng Gà + 1 Khoai Tây Chiên(vừa) + 2 Pepsi (vừa)',1,'2025-06-03 14:55:56','2025-06-03 14:55:56'),(13,2,'Xốt Phô mai Cay Bùng Cháy','Món mới - Xốt Phô mai Cay Bùng Cháy','VND',5.000,'1 gói xốt Phô mai cây',1,'2025-06-03 14:56:39','2025-06-03 14:56:39'),(14,2,'Xốt Yuzu Thanh Mát','Món mới - Xốt Yuzu Thanh Mát','VND',5.000,'1 gói Xốt Yuzu Thanh Mát\n',1,'2025-06-03 15:01:08','2025-06-03 15:01:08'),(15,3,'Combo 2 Miếng Gà','Combo 1 người - Combo 2 Miếng gà','VND',95.000,'2 Miếng Gà Rán + 1 Khoai Tây Chiên (Vừa)/1 Khoai Tây Nghiền (Vừa) & 1 Bắp Cải Trộn (Vừa) + 1 Ly Pepsi (Tiêu chuẩn) + 3 Gói tương (cà/ ớt)',1,'2025-06-03 15:02:12','2025-06-03 15:02:12'),(16,3,'Combo Gà Rán Tender','Combo 1 người - Combo Gà Rán Tender','VND',85.000,'3 Miếng Gà Rán Tenders + 1 Xà lách Hạt + 1 Pepsi Không Đường (Tiêu chuẩn) + 1 Gói tương (cà/ ớt)',1,'2025-06-03 15:03:00','2025-06-03 15:03:00'),(17,3,'Combo Phi-lê Gà Quay','Combo 1 người - Combo Phi-lê Gà Quay','VND',69.000,'1 Miếng Phi-lê Gà Quay + 1 Bắp Cải Trộn (Lớn) + 1 Pepsi Không Đường (Tiêu chuẩn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:02:17','2025-06-04 03:02:17'),(18,3,'Combo Mì Ý Gà Viên','Combo 1 người - Combo Mì Ý Gà Viên','VND',45.000,'1 Mì Ý Gà Viên + 1 Pepsi (Tiêu chuẩn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:03:05','2025-06-04 03:03:05'),(19,3,'Combo Mì Ý Gà Rán','Combo 1 người - Combo Mỳ Ý Gà Rán','VND',72.000,'1 Mì Ý Gà Rán + 1 Ly Pepsi (Tiêu chuẩn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:03:49','2025-06-04 03:03:49'),(20,3,'Combo Mì Ý và Gà Tender','Combo 1 người - Combo Mì Ý và Gà Tender','VND',95.000,'1 Mì Ý Gà Viên + 2 Miếng Gà Rán Tenders + 1 Khoai Tây Chiên (Vừa) + 1 Pepsi (Tiêu chuẩn) + 3 Gói tương (cà/ ớt)',1,'2025-06-04 03:04:26','2025-06-04 03:04:26'),(21,3,'Combo Mì Ý và Salad Gà','Combo 1 người - Combo Mì Ý và Salad Gà','VND',85.000,'1 Mì Ý Gà Viên + 1 Xà Lách Gà Viên + 1 Pepsi (Tiêu chuẩn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:05:21','2025-06-04 03:05:21'),(22,3,'Combo Cơm Gà Rán','Combo 1 người - Combo Cơm Gà Rán','VND',59.000,'1 Cơm Gà Rán + 1 Ly Pepsi (Tiêu chuẩn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:06:03','2025-06-04 03:06:03'),(23,3,'Combo Cơm Gà Quay','Combo 1 người - Combo Cơm Gà Quay','VND',59.000,'1 Cơm Gà Flava + 1 Ly Pepsi (Tiêu chuẩn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:06:38','2025-06-04 03:06:38'),(24,3,'Combo Cơm Gà Nanban','Combo 1 người - Combo Cơm Gà Nanban','VND',49.000,'1 Cơm Gà Nanban + 1 Ly Pepsi (Tiêu chuẩn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:07:07','2025-06-04 03:07:07'),(25,3,'Combo Burger Tôm','Combo 1 người - Combo Burger Tôm','VND',59.000,'1 Burger Tôm + 1 Ly Pepsi (Tiêu chuẩn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:08:35','2025-06-04 03:08:35'),(26,3,'Combo Burger Tôm & Gà Rán','Combo 1 người - Combo Burger Tôm & Gà Rán','VND',78.000,'1 Burger Tôm + 1 Miếng Gà Rán + 1 Ly Pepsi (Tiêu chuẩn) + 2 Gói tương (cà/ ớt)',1,'2025-06-04 03:25:34','2025-06-04 03:25:34'),(27,3,'Combo Burger và Gà Rán','Combo 1 người - Combo Burger và Gà Rán','VND',112.000,'1 Burger Gà Quay/Zinger + 1 Khoai Tây Chiên (Vừa) + 1 Miếng Gà Rán + 1 Ly Pepsi (Tiêu chuẩn) + 3 Gói tương (cà/ ớt)',1,'2025-06-04 03:30:42','2025-06-04 03:30:42'),(28,4,'Combo Nhóm 2 Hoàn Hảo','Combo Nhóm - Combo Nhóm 2 Hoàn Hảo','VND',135.000,'2 Miếng Gà Rán + 1 Burger Zinger + 2 Ly Pepsi (Tiêu chuẩn)+ 3 Gói tương (cà/ ớt)',1,'2025-06-04 03:31:44','2025-06-04 03:31:44'),(29,4,'Combo Nhóm 2 Tròn Vị ','Combo Nhóm - Combo Nhóm 2 Tròn Vị ','VND',160.000,'3 Miếng Gà Rán + 1 Mì Ý Gà Viên + 2 Ly Pepsi (Tiêu chuẩn) + 4 Gói tương (cà/ ớt)',1,'2025-06-04 03:32:11','2025-06-04 03:32:11'),(30,4,'Combo Nhóm 2 No Nê','Combo Nhóm - Combo Nhóm 2 No Nê','VND',179.000,'4 Miếng Gà Rán + 1 Khoai Múi Cau (Vừa) + 2 Ly Pepsi (Tiêu chuẩn) + 5 Gói tương (cà/ ớt)',1,'2025-06-04 03:32:59','2025-06-04 03:32:59'),(31,4,'Combo Nhóm 3 Đủ Đầy','Combo Nhóm - Combo Nhóm 3 Đủ Đầy','VND',219.000,'3 Miếng Gà Rán + 1 Mì Ý Gà Viên + 1 Burger Tôm + 1 Khoai Tây Chiên (Vừa) + 3 Ly Pepsi (Tiêu chuẩn) + 6 Gói tương (cà/ ớt)',1,'2025-06-04 03:34:45','2025-06-04 03:34:45'),(32,4,'Combo Nhóm 5 Hội Tụ','Combo Nhóm - Combo Nhóm 5 Hội Tụ','VND',309.000,'6 Miếng Gà Rán + 1 Mì Ý Gà Viên + 1 Khoai Múi Cau (Vừa) + 5 Ly Pepsi (Tiêu chuẩn) + 8 Gói tương (cà/ ớt)',1,'2025-06-04 03:36:53','2025-06-04 03:36:53'),(33,5,'1 Miếng Gà Rán','Gà Rán - Gà Quay - 1 Miếng Gà Rán','VND',35.000,'1 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:39:15','2025-06-04 03:39:15'),(34,4,'2 Miếng Gà Rán ','Combo Nhóm - 2 Miếng Gà Rán','VND',70.000,'2 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay + 2 Gói tương (cà/ ớt)',1,'2025-06-04 03:39:57','2025-06-04 03:39:57'),(35,4,'3 Miếng Gà Rán','Combo Nhóm - 3 Miếng Gà Rán','VND',104.000,'3 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay + 3 Gói tương (cà/ ớt)',1,'2025-06-04 03:40:41','2025-06-04 03:40:41'),(36,4,'6 Miếng Gà rán','Combo Nhóm - 6 Miếng Gà rán','VND',205.000,'6 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay + 6 Gói tương (cà/ ớt)',1,'2025-06-04 03:41:37','2025-06-04 03:41:37'),(37,4,'1 Miếng Phi-lê Gà Quay','Combo Nhóm - 1 Miếng Phi-lê Gà Quay','VND',42.000,'1 Miếng Phi-lê Gà Quay Flava/Phi-lê Gà Quay Tiêu',1,'2025-06-04 03:42:13','2025-06-04 03:42:13'),(38,4,'Gà Viên (Vừa)','Combo Nhóm - Gà Viên (Vừa)','VND',38.000,'Gà Viên (Vừa) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:43:24','2025-06-04 03:43:24'),(39,4,'Gà Viên (Lớn)','Combo Nhóm - Gà Viên (Lớn)','VND',64.000,'Gà Viên (Lớn) + 2 Gói tương (cà/ ớt)',1,'2025-06-04 03:44:06','2025-06-04 03:44:06'),(40,4,'3 Gà Miếng Nuggets','Combo Nhóm - 3 Gà Miếng Nuggest','VND',27.000,'3 Gà Miếng Nuggets + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:45:02','2025-06-04 03:45:02'),(41,4,'5 Gà Miếng Nuggets','Combo Nhóm - 5 Gà Miếng Nuggets','VND',40.000,'5 Gà Miếng Nuggets + 2 Gói tương (cà/ ớt)',1,'2025-06-04 03:45:34','2025-06-04 03:45:34'),(42,4,'10 Gà Miếng Nuggets','Combo Nhóm - 10 Gà Miếng Nuggets','VND',75.000,'10 Gà Miếng Nuggets + 4 Gói tương (cà/ ớt)',1,'2025-06-04 03:46:09','2025-06-04 03:46:09'),(43,4,'3 Miếng Gà Rán Tender ','Combo Nhóm- 3 Miếng Gà Rán Tender','VND',41.000,'3 Miếng Gà Rán Tender + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:46:45','2025-06-04 03:46:45'),(44,4,'5 Miếng Gà Rán Tender','Combo Nhóm - 5 Miếng Gà Rán Tender','VND',66.000,'5 Miếng Gà Rán Tender + 2 Gói tương (cà/ ớt)',1,'2025-06-04 03:47:41','2025-06-04 03:47:41'),(45,6,'Burger Zinger','Burger - Burger Zinger','VND',54.000,'1 Burger Zinger +1 Gói tương (cà/ ớt)',1,'2025-06-04 03:48:34','2025-06-04 03:48:34'),(46,4,'Burger Tôm','Combo Nhóm - Burger Tôm','VND',45.000,'1 Burger Tôm + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:49:46','2025-06-04 03:49:46'),(47,6,'Burger Gà Quay Flava','Burger - Burger Gà Quay Flava','VND',54.000,'1 Burger Gà Quay Flava + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:50:40','2025-06-04 03:50:40'),(48,6,'Com Gà Teriyaki','Burger - Com Gà Teriyaki','VND',45.000,'1 Cơm Gà Teriyaki + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:51:37','2025-06-04 03:51:37'),(49,6,'Cơm Gà Rán','Burger - Cơm Gà Rán','VND',49.000,'1 Cơm Gà Rán + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:52:25','2025-06-04 03:52:25'),(50,6,'Cơm Phi-lê Gà Quay','Cơm- Cơm Phi-lê Gà Quay','VND',49.000,'1 Cơm Phi-lê Gà Quay + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:53:35','2025-06-04 03:53:35'),(51,6,'Cơm ','Cơm - Cơm ','VND',12.000,'Cơm ',1,'2025-06-04 03:54:12','2025-06-04 03:54:12'),(52,6,'Mý Ý Gà Viên','Mỳ Ý - Mỳ Ý Gà Viên','VND',40.000,'1 Mì Ý Gà Viên + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:55:40','2025-06-04 03:55:40'),(53,6,'Mỳ Ý Gà Rán ','Mỳ Ý - Mỳ Ý Gà Rán','VND',64.000,'1 Mì Ý Gà Rán + + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:56:26','2025-06-04 03:56:26'),(54,6,'Cơm Gà Viên Nanban','Cơm - Cơm Gà Viên Nanban','VND',39.000,'1 Cơm Gà Viên Nanban + 1 Gói tương (cà/ ớt)',1,'2025-06-04 03:57:02','2025-06-04 03:57:02'),(55,7,'Salad Hạt','Thức ăn nhẹ - Salad Hạt','VND',39.000,'1 Salad Hạt',1,'2025-06-04 07:37:53','2025-06-04 07:37:53'),(56,7,'Salad Pop','Thức ăn nhẹ - Salad Pop','VND',45.000,' 1 Salad Hạt Gà Viên Popcorn',1,'2025-06-04 07:38:44','2025-06-04 07:38:44'),(57,7,'3 Cá Thanh','Thức ăn nhẹ - 3 Cá Thanh','VND',40.000,'3 Cá Thanh + 1 Gói tương (cà/ ớt)',1,'2025-06-04 07:39:28','2025-06-04 07:39:28'),(58,7,'4 Phô Mai Viên','Thức ăn nhẹ - 4 Phô Mai Viên','VND',40.000,'4 Phô Mai Viên + 1 Gói tương (cà/ ớt)',1,'2025-06-04 07:40:19','2025-06-04 07:40:19'),(59,7,'6 Phô Mai Viên','Thức Ăn nhẹ - 6 Phô Mai Viên','VND',49.000,'6 Phô Mai Viên + 1 Gói tương (cà/ ớt)',1,'2025-06-04 07:41:27','2025-06-04 07:41:27'),(60,7,'Khoai Tây Chiên (Vừa)','Thức ăn nhẹ - Khoai Tây Chiên (Vừa)','VND',19.000,'Khoai Tây Chiên (Vừa) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 07:41:58','2025-06-04 07:41:58'),(61,7,'Khoai Tây Chiên (Lớn)','Thức ăn nhẹ - Khoai Tây Chiên (Lớn)','VND',29.000,'Khoai Tây Chiên (Lớn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 07:42:30','2025-06-04 07:42:30'),(62,7,'Khoai Tây Chiên (Đại)','Thức ăn nhẹ - Khoai Tây Chiên (Đại)','VND',39.000,'Khoai Tây Chiên (Đại) + 2 Gói tương (cà/ ớt)',1,'2025-06-04 07:43:10','2025-06-04 07:43:10'),(63,7,'Khoai Tây Múi Cau (Vừa)','Thức ăn nhẹ - Khoai Tây Múi Cau (Vừa)','VND',23.000,'01 Khoai Tây Múi Cau (vừa) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 07:43:51','2025-06-04 07:43:51'),(64,7,'Khoai Tây Múi Cau (Lớn)','Thức ăn nhẹ - Khoai Tây Múi Cau (Lớn)','VND',43.000,'01 Khoai Tây Múi Cau (lớn) + 1 Gói tương (cà/ ớt)',1,'2025-06-04 07:46:20','2025-06-04 07:46:20'),(65,7,'Khoai Tây Nghiền (Vừa)','Thức ăn nhẹ - Khoai Tây Nghiền (Vừa)','VND',12.000,'Khoai Tây Nghiền (Vừa)',1,'2025-06-04 07:46:58','2025-06-04 07:46:58'),(66,7,'Khoai Tây Nghiền (Lớn)','Thức ăn nhẹ - Khoai Tây Nghiền (Lớn)','VND',22.000,'Khoai Tây Nghiền (Lớn)',1,'2025-06-04 07:47:35','2025-06-04 07:47:35'),(67,7,'Khoai Tây Nghiền (Đại)','Thức ăn nhẹ - Khoai Tây Nghiền (Đại)','VND',31.000,'Khoai Tây Nghiền (Đại)',1,'2025-06-04 07:48:40','2025-06-04 07:48:40'),(68,7,'Bắp Cải Trộn (Vừa)','Thức ăn nhẹ - Bắp Cải Trộn (Vừa)','VND',12.000,'Bắp Cải Trộn (Vừa)',1,'2025-06-04 07:49:14','2025-06-04 07:49:14'),(69,7,'Bắp Cải Trộn (Lớn)','Thức ăn nhẹ - Bắp Cải Trộn (Lớn)','VND',22.000,'Bắp Cải Trộn (Lớn)',1,'2025-06-04 07:49:49','2025-06-04 07:49:49'),(70,7,'Bắp Cải Trộn (Đại)','Thức ăn nhẹ - Bắp Cải Trộn (Đại)','VND',31.000,'Bắp Cải Trộn (Đại)',1,'2025-06-04 07:50:20','2025-06-04 07:50:20'),(71,7,'Súp Rong Biển','Thức ăn nhẹ - Súp Rong Biển','VND',19.000,'Súp Rong Biển',1,'2025-06-04 07:51:02','2025-06-04 07:51:02'),(72,8,'4 Bánh Trứng ','Thức uống - 4 Bánh Trứng','VND',64.000,'4 Bánh Trứng ',1,'2025-06-04 07:52:22','2025-06-04 07:52:22'),(73,8,'2 Viên Khoai Môn Kim Sa','Tráng miệng - 2 Viên Khoai Môn Kim Sa','VND',26.000,'2 Viên Khoai Môn Kim Sa',1,'2025-06-04 07:53:49','2025-06-04 07:53:49'),(74,8,'3 Viên Khoai Môn Kim Sa','Tráng miệng - 3 Viên Khoai Môn Kim Sa','VND',34.000,'3 Viên Khoai Môn Kim Sa',1,'2025-06-04 07:54:21','2025-06-04 07:54:21'),(75,8,'5 Viên Khoai Môn Kim Sa','Tráng miệng - 5 Viên Khoai Môn Kim Sa','VND',54.000,'5 Viên Khoai Môn Kim Sa',1,'2025-06-04 07:54:53','2025-06-04 07:54:53'),(76,8,'Pepsi Lon','Thức uống - Pepsi Lon','VND',19.000,'Pepsi Lon',1,'2025-06-04 07:55:36','2025-06-04 07:55:36'),(77,8,'7Up Lon','Thức uống - 7Up Lon','VND',19.000,'7Up Lon',1,'2025-06-04 07:56:38','2025-06-04 07:56:38'),(78,8,'Aquafina 500ml','Thức uống - Aquafina 500ml','VND',15.000,'Aquafina 500ml',1,'2025-06-04 07:57:18','2025-06-04 07:57:18'),(79,8,'Pepsi Không Calo Lon','Thức uống - Pepsi Không Calo Lon','VND',19.000,'Pepsi Không Calo Lon',1,'2025-06-04 07:58:55','2025-06-04 07:58:55'),(80,8,'Lon Sting','Thức uống - Lon Sting','VND',19.000,'Lon Sting',1,'2025-06-04 07:59:33','2025-06-04 07:59:33'),(81,8,'Pepsi (Tiêu Chuẩn)','Thức uống - Pepsi (Tiêu Chuẩn)','VND',12.000,' 1 Ly Pepsi (Tiêu Chuẩn)\n',1,'2025-06-04 08:01:44','2025-06-04 08:01:44'),(82,8,'Pepsi (Vừa)','Thức uống - Pepsi (Vừa)','VND',15.000,'1 Ly Pepsi (Vừa)',1,'2025-06-04 08:02:12','2025-06-04 08:02:12'),(83,8,'Sô-cô-la Sữa Đá','Thức uống - Sô-cô-la Sữa Đá','VND',20.000,'1 Ly Sô-cô-la Sữa Đá',1,'2025-06-04 08:03:39','2025-06-04 08:03:39'),(84,8,'Pepsi Không Đường (Đại)','Thức uống - 1 Ly Pepsi Không Đường (Đại)','VND',21.000,'1 Ly Pepsi Không Đường (Đại)',1,'2025-06-04 08:22:05','2025-06-04 08:22:05');
/*!40000 ALTER TABLE `dishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishlist_images`
--

DROP TABLE IF EXISTS `dishlist_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dishlist_images` (
  `id_dishlist` int NOT NULL,
  `alt_text` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL,
  `create_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  KEY `id_dishlist_idx` (`id_dishlist`),
  CONSTRAINT `id_dishlist` FOREIGN KEY (`id_dishlist`) REFERENCES `dishlist` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishlist_images`
--

LOCK TABLES `dishlist_images` WRITE;
/*!40000 ALTER TABLE `dishlist_images` DISABLE KEYS */;
INSERT INTO `dishlist_images` VALUES (1,'','https://static.kfcvietnam.com.vn/images/items/lg/CBO_NGON%20DINH.jpg?v=LKwQDL','2025-06-03 14:28:41','2025-06-03 14:28:41'),(2,'','https://static.kfcvietnam.com.vn/images/items/lg/burgeryo-new.jpg?v=LKwQDL','2025-06-03 14:30:18','2025-06-03 14:30:18'),(3,'','https://static.kfcvietnam.com.vn/images/items/lg/D-CHICKEN-1.jpg?v=LKwQDL','2025-06-03 14:42:24','2025-06-03 14:42:24'),(4,'','https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET1.jpg?v=LKwQDL','2025-06-03 14:47:23','2025-06-03 14:47:23'),(5,'','https://static.kfcvietnam.com.vn/images/items/lg/Burger-Zinger.jpg?v=LKwQDL','2025-06-03 14:48:34','2025-06-03 14:48:34'),(6,'','https://static.kfcvietnam.com.vn/images/items/lg/SALAD-HAT.jpg?v=LKwQDL','2025-06-03 14:49:51','2025-06-03 14:49:51'),(7,'','https://static.kfcvietnam.com.vn/images/items/lg/EGGTART-1.jpg?v=LKwQDL','2025-06-03 14:51:18','2025-06-03 14:51:18'),(8,'','https://static.kfcvietnam.com.vn/images/items/lg/CBO_VUI%20DINH.jpg?v=LKwQDL','2025-06-03 14:52:45','2025-06-03 14:52:45'),(9,'','https://static.kfcvietnam.com.vn/images/items/lg/CBO_QUAY%20DINH.jpg?v=LKwQDL','2025-06-03 14:53:28','2025-06-03 14:53:28'),(10,'','https://static.kfcvietnam.com.vn/images/items/lg/yolo-new.jpg?v=LKwQDL','2025-06-03 14:54:12','2025-06-03 14:54:12'),(11,'','https://static.kfcvietnam.com.vn/images/items/lg/yogion-new.jpg?v=LKwQDL','2025-06-03 14:55:06','2025-06-03 14:55:06'),(12,'','https://static.kfcvietnam.com.vn/images/items/lg/yono-new.jpg?v=LKwQDL','2025-06-03 14:55:56','2025-06-03 14:55:56'),(13,'','https://static.kfcvietnam.com.vn/images/items/lg/PHO-MAI.jpg?v=LKwQDL','2025-06-03 14:56:39','2025-06-03 14:56:39'),(14,'','https://static.kfcvietnam.com.vn/images/items/lg/YUZU.jpg?v=LKwQDL','2025-06-03 15:01:08','2025-06-03 15:01:08'),(15,'','https://static.kfcvietnam.com.vn/images/items/lg/D-CHICKEN-2.jpg?v=LKwQDL','2025-06-03 15:02:12','2025-06-03 15:02:12'),(16,'','https://static.kfcvietnam.com.vn/images/items/lg/D-TENDER.jpg?v=LKwQDL','2025-06-03 15:03:00','2025-06-03 15:03:00'),(17,'','https://static.kfcvietnam.com.vn/images/items/lg/D-ROASTED.jpg?v=4pb7k3','2025-06-04 03:02:17','2025-06-04 03:02:17'),(18,'','https://static.kfcvietnam.com.vn/images/items/lg/D-PASTA-POP.jpg?v=4pb7k3','2025-06-04 03:03:05','2025-06-04 03:03:05'),(19,'','https://static.kfcvietnam.com.vn/images/items/lg/D-PASTA-COB.jpg?v=4pb7k3','2025-06-04 03:03:49','2025-06-04 03:03:49'),(20,'','https://static.kfcvietnam.com.vn/images/items/lg/D-PASTA-TENDERS.jpg?v=4pb7k3','2025-06-04 03:04:26','2025-06-04 03:04:26'),(21,'','https://static.kfcvietnam.com.vn/images/items/lg/D-PASTA-SALAD.jpg?v=4pb7k3','2025-06-04 03:05:21','2025-06-04 03:05:21'),(22,'','https://static.kfcvietnam.com.vn/images/items/lg/D-RICE-COB.jpg?v=4pb7k3','2025-06-04 03:06:03','2025-06-04 03:06:03'),(23,'','https://static.kfcvietnam.com.vn/images/items/lg/D-RICE-ROASTED.jpg?v=4pb7k3','2025-06-04 03:06:38','2025-06-04 03:06:38'),(24,'','https://static.kfcvietnam.com.vn/images/items/lg/D-RICE-NANBAN.jpg?v=4pb7k3','2025-06-04 03:07:07','2025-06-04 03:07:07'),(25,'','https://static.kfcvietnam.com.vn/images/items/lg/D-SHRIMP.jpg?v=4pb7k3','2025-06-04 03:08:35','2025-06-04 03:08:35'),(26,'','https://static.kfcvietnam.com.vn/images/items/lg/D-B.SHRIMP-COB.jpg?v=4pb7k3','2025-06-04 03:25:34','2025-06-04 03:25:34'),(27,'','https://static.kfcvietnam.com.vn/images/items/lg/D-BURGER-COB-FF.jpg?v=LKwQDL','2025-06-04 03:30:42','2025-06-04 03:30:42'),(28,'','https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET1.jpg?v=LKwQDL','2025-06-04 03:31:44','2025-06-04 03:31:44'),(29,'','https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET5.jpg?v=LKwQDL','2025-06-04 03:32:11','2025-06-04 03:32:11'),(30,'','https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET4.jpg?v=4pb7k3','2025-06-04 03:32:59','2025-06-04 03:32:59'),(31,'','https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET2.jpg?v=4pb7k3','2025-06-04 03:34:45','2025-06-04 03:34:45'),(32,'','https://static.kfcvietnam.com.vn/images/items/lg/DBUCKET3.jpg?v=4pb7k3','2025-06-04 03:36:53','2025-06-04 03:36:53'),(33,'','https://static.kfcvietnam.com.vn/images/items/lg/1-GA-XOT.jpg?v=4pb7k3','2025-06-04 03:39:15','2025-06-04 03:39:15'),(34,'','https://static.kfcvietnam.com.vn/images/items/lg/2-GA-XOT.jpg?v=4pb7k3','2025-06-04 03:39:57','2025-06-04 03:39:57'),(35,'','https://static.kfcvietnam.com.vn/images/items/lg/3-GA-XOT.jpg?v=4pb7k3','2025-06-04 03:40:41','2025-06-04 03:40:41'),(36,'','https://static.kfcvietnam.com.vn/images/items/lg/6-GA-XOT.jpg?v=4pb7k3','2025-06-04 03:41:37','2025-06-04 03:41:37'),(37,'','https://static.kfcvietnam.com.vn/images/items/lg/PHILE-XOT.jpg?v=4pb7k3','2025-06-04 03:42:13','2025-06-04 03:42:13'),(38,'','https://static.kfcvietnam.com.vn/images/items/lg/POPCORN-XOT.jpg?v=4pb7k3','2025-06-04 03:43:24','2025-06-04 03:43:24'),(39,'','https://static.kfcvietnam.com.vn/images/items/lg/POP-L.jpg?v=4pb7k3','2025-06-04 03:44:06','2025-06-04 03:44:06'),(40,'','https://static.kfcvietnam.com.vn/images/items/lg/3_Nuggests.jpg?v=4pb7k3','2025-06-04 03:45:02','2025-06-04 03:45:02'),(41,'','https://static.kfcvietnam.com.vn/images/items/lg/5_Nuggests.jpg?v=4pb7k3','2025-06-04 03:45:34','2025-06-04 03:45:34'),(42,'','https://static.kfcvietnam.com.vn/images/items/lg/10_Nuggests.jpg?v=4pb7k3','2025-06-04 03:46:09','2025-06-04 03:46:09'),(43,'','https://static.kfcvietnam.com.vn/images/items/lg/TENDERS-3.jpg?v=4pb7k3','2025-06-04 03:46:45','2025-06-04 03:46:45'),(44,'','https://static.kfcvietnam.com.vn/images/items/lg/TENDERS-5.jpg?v=4pb7k3','2025-06-04 03:47:41','2025-06-04 03:47:41'),(45,'','https://static.kfcvietnam.com.vn/images/items/lg/Burger-Zinger.jpg?v=4pb7k3','2025-06-04 03:48:34','2025-06-04 03:48:34'),(46,'','https://static.kfcvietnam.com.vn/images/items/lg/Burger-Shrimp.jpg?v=4pb7k3','2025-06-04 03:49:46','2025-06-04 03:49:46'),(47,'','https://static.kfcvietnam.com.vn/images/items/lg/Burger-Flava.jpg?v=4pb7k3','2025-06-04 03:50:40','2025-06-04 03:50:40'),(48,'','https://static.kfcvietnam.com.vn/images/items/lg/Rice-Teriyaki.jpg?v=4pb7k3','2025-06-04 03:51:37','2025-06-04 03:51:37'),(49,'','https://static.kfcvietnam.com.vn/images/items/lg/Rice-F.Chicken.jpg?v=4pb7k3','2025-06-04 03:52:25','2025-06-04 03:52:25'),(50,'','https://static.kfcvietnam.com.vn/images/items/lg/Rice-Flava.jpg?v=4pb7k3','2025-06-04 03:53:35','2025-06-04 03:53:35'),(51,'','https://static.kfcvietnam.com.vn/images/items/lg/Rice.jpg?v=4pb7k3','2025-06-04 03:54:12','2025-06-04 03:54:12'),(52,'','https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-VIEN.jpg?v=4pb7k3','2025-06-04 03:55:40','2025-06-04 03:55:40'),(53,'','https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-RAN.jpg?v=4pb7k3','2025-06-04 03:56:26','2025-06-04 03:56:26'),(54,'','https://static.kfcvietnam.com.vn/images/items/lg/NANBAN.jpg?v=4pb7k3','2025-06-04 03:57:02','2025-06-04 03:57:02'),(55,'','https://static.kfcvietnam.com.vn/images/items/lg/SALAD-HAT.jpg?v=4pb7k3','2025-06-04 07:37:53','2025-06-04 07:37:53'),(56,'','https://static.kfcvietnam.com.vn/images/items/lg/SALAD-HAT-GA-VIEN.jpg?v=4pb7k3','2025-06-04 07:38:44','2025-06-04 07:38:44'),(57,'','https://static.kfcvietnam.com.vn/images/items/lg/3-FISH-STICK.jpg?v=4pb7k3','2025-06-04 07:39:28','2025-06-04 07:39:28'),(58,'','https://static.kfcvietnam.com.vn/images/items/lg/4-Chewy-Cheese.jpg?v=4pb7k3','2025-06-04 07:40:19','2025-06-04 07:40:19'),(59,'','https://static.kfcvietnam.com.vn/images/items/lg/6-Chewy-Cheese.jpg?v=4pb7k3','2025-06-04 07:41:27','2025-06-04 07:41:27'),(60,'','https://static.kfcvietnam.com.vn/images/items/lg/FF-R.jpg?v=4pb7k3','2025-06-04 07:41:58','2025-06-04 07:41:58'),(61,'','https://static.kfcvietnam.com.vn/images/items/lg/FF-L.jpg?v=4pb7k3','2025-06-04 07:42:30','2025-06-04 07:42:30'),(62,'','https://static.kfcvietnam.com.vn/images/items/lg/FF-J.jpg?v=4pb7k3','2025-06-04 07:43:10','2025-06-04 07:43:10'),(63,'','https://static.kfcvietnam.com.vn/images/items/lg/khoai-mui-cau-R.jpg?v=4pb7k3','2025-06-04 07:43:51','2025-06-04 07:43:51'),(64,'','https://static.kfcvietnam.com.vn/images/items/lg/khoai-mui-cau-L.jpg?v=4pb7k3','2025-06-04 07:46:20','2025-06-04 07:46:20'),(65,'','https://static.kfcvietnam.com.vn/images/items/lg/MP-(R)-new.jpg?v=4pb7k3','2025-06-04 07:46:58','2025-06-04 07:46:58'),(66,'','https://static.kfcvietnam.com.vn/images/items/lg/MP-(L)-new.jpg?v=4pb7k3','2025-06-04 07:47:35','2025-06-04 07:47:35'),(67,'','https://static.kfcvietnam.com.vn/images/items/lg/MP-(J)-new.jpg?v=4pb7k3','2025-06-04 07:48:40','2025-06-04 07:48:40'),(68,'','https://static.kfcvietnam.com.vn/images/items/lg/CL-(R)-new.jpg?v=4pb7k3','2025-06-04 07:49:14','2025-06-04 07:49:14'),(69,'','https://static.kfcvietnam.com.vn/images/items/lg/CL-(L)-new.jpg?v=4pb7k3','2025-06-04 07:49:49','2025-06-04 07:49:49'),(70,'','https://static.kfcvietnam.com.vn/images/items/lg/CL-(J)-new.jpg?v=4pb7k3','2025-06-04 07:50:20','2025-06-04 07:50:20'),(71,'','https://static.kfcvietnam.com.vn/images/items/lg/Soup-Rong-Bien.jpg?v=4pb7k3','2025-06-04 07:51:02','2025-06-04 07:51:02'),(72,'','https://static.kfcvietnam.com.vn/images/items/lg/EGGTART-4.jpg?v=4pb7k3','2025-06-04 07:52:22','2025-06-04 07:52:22'),(73,'','https://static.kfcvietnam.com.vn/images/items/lg/2-taro.jpg?v=4pb7k3','2025-06-04 07:53:49','2025-06-04 07:53:49'),(74,'','https://static.kfcvietnam.com.vn/images/items/lg/3-taro.jpg?v=4pb7k3','2025-06-04 07:54:21','2025-06-04 07:54:21'),(75,'','https://static.kfcvietnam.com.vn/images/items/lg/5-taro.jpg?v=4pb7k3','2025-06-04 07:54:53','2025-06-04 07:54:53'),(76,'','https://static.kfcvietnam.com.vn/images/items/lg/PEPSI_CAN.jpg?v=4pb7k3','2025-06-04 07:55:36','2025-06-04 07:55:36'),(77,'','https://static.kfcvietnam.com.vn/images/items/lg/7UP_CAN.jpg?v=4pb7k3','2025-06-04 07:56:38','2025-06-04 07:56:38'),(78,'','https://static.kfcvietnam.com.vn/images/items/lg/AQUAFINA.jpg?v=4pb7k3','2025-06-04 07:57:18','2025-06-04 07:57:18'),(79,'','https://static.kfcvietnam.com.vn/images/items/lg/pepsi-zero.jpg?v=4pb7k3','2025-06-04 07:58:55','2025-06-04 07:58:55'),(80,'','https://static.kfcvietnam.com.vn/images/items/lg/Sting.jpg?v=4pb7k3','2025-06-04 07:59:33','2025-06-04 07:59:33'),(81,'','https://static.kfcvietnam.com.vn/images/items/lg/PEPSI-STD.jpg?v=4pb7k3','2025-06-04 08:01:44','2025-06-04 08:01:44'),(82,'','https://static.kfcvietnam.com.vn/images/items/lg/PEPSI-M.jpg?v=4pb7k3','2025-06-04 08:02:12','2025-06-04 08:02:12'),(83,'','https://static.kfcvietnam.com.vn/images/items/lg/CHOCO-MILK-STD.jpg?v=4pb7k3','2025-06-04 08:03:39','2025-06-04 08:03:39'),(84,'','https://static.kfcvietnam.com.vn/images/items/lg/PEPSI-ZERO-J.jpg?v=4pb7k3','2025-06-04 08:22:05','2025-06-04 08:22:05');
/*!40000 ALTER TABLE `dishlist_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price` decimal(10,3) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `id_dishlist` int NOT NULL,
  `id_order` int NOT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_id_dishlist` (`id_dishlist`),
  KEY `idx_id_order` (`id_order`),
  CONSTRAINT `fk_order_details_dishlist` FOREIGN KEY (`id_dishlist`) REFERENCES `dishlist` (`id`),
  CONSTRAINT `fk_order_details_order` FOREIGN KEY (`id_order`) REFERENCES `order_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,1,42000.000,'khong beo',1,3,'2025-06-04 14:20:12','2025-06-04 14:20:12'),(2,1,255.000,'gởi nhanh cho tôi 30 phút',9,4,'2025-06-05 09:34:42','2025-06-05 09:34:42'),(3,2,255.000,'gởi nhanh cho tôi 30 phút',9,5,'2025-06-05 09:44:56','2025-06-05 09:44:56'),(4,1,29.000,'gởi nhanh',2,6,'2025-06-05 09:48:41','2025-06-05 09:48:41'),(5,1,170.000,'gởi nhanh',8,7,'2025-06-05 11:58:39','2025-06-05 11:58:39'),(6,3,255.000,'gởi nhanh cho tôi 30 phút',9,8,'2025-06-06 06:20:04','2025-06-06 06:20:04'),(7,1,59.000,'giao nhanh',10,9,'2025-06-06 06:20:51','2025-06-06 06:20:51');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2025-06-09 11:36:41
