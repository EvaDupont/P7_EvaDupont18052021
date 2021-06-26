/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ rsegp /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE rsegp;

DROP TABLE IF EXISTS comments;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  `PostId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS likes;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  `PostId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS posts;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;


INSERT INTO likes(id,createdAt,updatedAt,UserId,PostId) VALUES(10,'2021-06-24 12:52:55','2021-06-24 12:52:55',8,17),(12,'2021-06-26 08:32:14','2021-06-26 08:32:14',6,17),(13,'2021-06-26 08:32:18','2021-06-26 08:32:18',6,8),(14,'2021-06-26 08:35:14','2021-06-26 08:35:14',6,19),(16,'2021-06-26 10:26:54','2021-06-26 10:26:54',1,8),(17,'2021-06-26 10:26:59','2021-06-26 10:26:59',1,17),(18,'2021-06-26 12:20:01','2021-06-26 12:20:01',8,19),(19,'2021-06-26 12:31:47','2021-06-26 12:31:47',1,19);

INSERT INTO posts(id,message,link,imageUrl,createdAt,updatedAt,UserId) VALUES(8,X'426f6e6a6f757220c3a020746f7573206574206269656e76656e7520737572206c652072c3a97365617520736f6369616c2064652047726f75706f6d616e6961210a506f7374657a20646573206d6573736167657320706f757220766f7573207072c3a973656e74657220210a426f6e6e65206a6f75726ec3a96520',NULL,'http://localhost:3000/upload/smiley1624020495974.png','2021-06-18 12:48:15','2021-06-18 12:48:15',1),(17,X'426f6e6a6f757220c3a020746f75732c200a6a652073756973207261766965206427696e74c3a967726572206c652072c3a973656175203a2920',NULL,NULL,'2021-06-24 12:42:40','2021-06-24 12:42:40',8),(19,X'426f6e6a6f757220c3a020746f75732c0a766976656d656e74206c657320766163616e636573202121','https://media.giphy.com/media/3oEhmKRLR4mnFfv2CI/giphy.gif',NULL,'2021-06-26 08:30:40','2021-06-26 08:31:56',6);
INSERT INTO users(id,pseudo,email,password,photo,bio,admin,createdAt,updatedAt) VALUES(1,'admin','admin@mail.com','$2b$10$EP4waGfKSaYFbOHirWdELeMRlrWrAKoEGL3xIrSPl0VfC9Ja8W1Lq','http://localhost:3000/upload/admin1624696046852.png','Bonjour à tous, \nJe suis Edu, l\'administratrice du réseau social de GROUPOMANIA.\nJe veille au respect des règles de politesse et de bienséance sur le réseau.',1,'2021-06-11 12:37:33','2021-06-26 08:27:26'),(6,'Edu','edu@mail.com','$2b$10$QDzMaSsKBanF0mQZtjl.XuZmV7zDZrInM0bH/rDhHdhwZN.LJMRvm','http://localhost:3000/upload/Profile11624027258198.jpg','Bonjour, \nJe viens juste d\'arriver dans l\'entreprise et suis ravie de pouvoir utiliser ce réseau pour me présenter',0,'2021-06-18 14:39:59','2021-06-18 14:40:58'),(8,'Christina','chris@mail.com','$2b$10$dJbSZaeAQua3npco8OwXueDKDa5HPXGyDrtL0gzafdLSQy2QKyEba','http://localhost:3000/upload/ProfileF11624538278456.jpg',NULL,0,'2021-06-24 12:37:31','2021-06-26 12:31:07'),(9,'Clem','clem@mail.com','$2b$10$G2osxWx48UaxdOB7w4xi1eEbmRyZt8hgwZDvUCy/jdQ1WhSjTfp/a',NULL,NULL,0,'2021-06-26 13:43:45','2021-06-26 13:43:45');