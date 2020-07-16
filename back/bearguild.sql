-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: bearguild
-- ------------------------------------------------------
-- Server version	5.7.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jdrtables`
--

DROP TABLE IF EXISTS `jdrtables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jdrtables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jdr_name` varchar(255) NOT NULL,
  `dm` varchar(255) NOT NULL,
  `first_seance` date NOT NULL,
  `last_seance` date NOT NULL,
  `time_between_seances` int(255) NOT NULL,
  `CreatedAT` date NOT NULL,
  `UpdatedAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jdrtables`
--

LOCK TABLES `jdrtables` WRITE;
/*!40000 ALTER TABLE `jdrtables` DISABLE KEYS */;
INSERT INTO `jdrtables` VALUES (25,'D&D5e','Pauline','2020-06-12','2020-06-26',7,'2020-06-24','2020-06-24'),(26,'D&D5e','Pauline','2020-06-12','2020-06-26',7,'2020-06-24','2020-06-24'),(27,'D&D5e','Pauline','2020-06-12','2020-06-26',7,'2020-06-24','2020-06-24'),(28,'D&D5e','Pauline','2020-06-12','2020-06-26',7,'2020-06-24','2020-06-24'),(29,'Chroniques Oubliées','Nate','2020-06-24','2020-06-24',14,'2020-06-24','2020-06-24');
/*!40000 ALTER TABLE `jdrtables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `commit` text NOT NULL,
  `is_jds` tinyint(1) DEFAULT NULL,
  `is_jdr` tinyint(1) DEFAULT NULL,
  `jdrtable_id` int(11) DEFAULT NULL,
  `UpdatedAt` date NOT NULL,
  `CreatedAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (5,'2020-06-12','KIKOO',1,0,NULL,'2020-06-21','2020-06-21'),(6,'2020-06-12','KIKOO',0,1,NULL,'2020-06-21','2020-06-21'),(7,'2020-06-21','RAS',0,0,NULL,'2020-06-21','2020-06-21'),(10,'2020-06-21','Invité·e·s: Allan',1,0,NULL,'2020-06-21','2020-06-21'),(11,'2020-06-22','Invité·e·s: Nath',0,1,NULL,'2020-06-22','2020-06-22'),(12,'2020-06-12','KIKOO',1,0,NULL,'2020-06-23','2020-06-23'),(13,'2020-06-12','KIKOO',1,0,NULL,'2020-06-24','2020-06-24'),(14,'2020-06-12','KIKOO',1,0,NULL,'2020-06-24','2020-06-24'),(15,'2020-06-12','KIKOO',1,0,NULL,'2020-06-24','2020-06-24'),(16,'2020-06-12','KIKOO',1,0,NULL,'2020-06-24','2020-06-24'),(17,'2020-06-12','KIKOO',1,0,NULL,'2020-06-24','2020-06-24'),(18,'2020-06-12','KIKOO',1,0,25,'2020-06-24','2020-06-24'),(19,'2020-06-12','KIKOO',1,0,25,'2020-06-24','2020-06-24'),(20,'2020-06-25','RAS',0,1,27,'2020-06-25','2020-06-25');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  `firstname` varchar(255) COLLATE utf8_bin NOT NULL,
  `lastname` varchar(255) COLLATE utf8_bin NOT NULL,
  `DOB` date NOT NULL,
  `gender` enum('Homme','Femme','Autre') COLLATE utf8_bin NOT NULL,
  `email` text COLLATE utf8_bin NOT NULL,
  `city` varchar(255) COLLATE utf8_bin NOT NULL,
  `have_reduction` tinyint(1) NOT NULL,
  `have_paid` tinyint(1) NOT NULL,
  `is_jdr_player` tinyint(1) NOT NULL DEFAULT '0',
  `is_jds_player` tinyint(1) NOT NULL,
  `is_volunteer` tinyint(1) NOT NULL,
  `is_member_of_honor` tinyint(1) NOT NULL DEFAULT '0',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `is_super_admin` tinyint(1) NOT NULL DEFAULT '0',
  `username` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (32,'2020-06-19','2020-06-19','Pauline','Urkia','1996-05-21','Femme','urkia.p@free.fr','Chelles',0,1,1,1,0,0,0,1,'AAA','$2b$10$Cp7S8FuyI1dDyAHxaEM6HeaTlpb3ZufJlrRf.28E8kNVNAKVPCd3K');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_jdrtables`
--

DROP TABLE IF EXISTS `users_jdrtables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_jdrtables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `jdrtable_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_jdrtables`
--

LOCK TABLES `users_jdrtables` WRITE;
/*!40000 ALTER TABLE `users_jdrtables` DISABLE KEYS */;
INSERT INTO `users_jdrtables` VALUES (1,32,27),(2,32,28),(3,32,29);
/*!40000 ALTER TABLE `users_jdrtables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_sessions`
--

DROP TABLE IF EXISTS `users_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_sessions`
--

LOCK TABLES `users_sessions` WRITE;
/*!40000 ALTER TABLE `users_sessions` DISABLE KEYS */;
INSERT INTO `users_sessions` VALUES (3,32,5),(4,32,6),(5,32,8),(6,32,9),(7,32,10),(8,32,11),(9,32,12),(10,32,13),(11,32,14),(12,32,15),(13,32,16),(14,32,17),(15,32,18),(16,32,19),(17,32,20);
/*!40000 ALTER TABLE `users_sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-24 22:36:19
