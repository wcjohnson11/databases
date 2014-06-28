create database chat;

USE chat;

create table messages (
  message_id int auto_increment primary key,
  context varchar(140),
  created_at timestamp,
  user_id varchar(10),
  room_id int
);

/* Create other tables and define schemas for them here! */

create table users (
  user_id int auto_increment primary key,
  user_name varchar(20)
);

create table rooms (
  room_id int auto_increment primary key,
  room_name varchar(20),
  message_id int
);


/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




