DROP DATABASE IF EXISTS crossing;
CREATE DATABASE crossing;
\c crossing

CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar(20) NOT NULL,
  password varchar(20) NOT NULL,
  firstName varchar(20) NOT NULL,
  lastName varchar(20) NOT NULL,
  email varchar(20) NOT NULL,
  aboutme text,
  picture text
);

CREATE TABLE groups (
  id serial PRIMARY KEY,
  name varchar(40) NOT NULL,
  about text,
  location text
)

CREATE TABLE group_members (
  id serial PRIMARY KEY,
  group_id int REFERENCES groups(id),
  user_id int REFERENCES users(id),
  admin boolean
)

CREATE TABLE group_requests (
  id serial PRIMARY KEY,
  group_id int REFERENCES groups(id),
  requester_id int REFERENCES users(id),
  message text
)

CREATE TABLE friends (
  id serial PRIMARY KEY,
  friend1 int NOT NULL,
  friend2 int NOT NULL,
  status boolean DEFAULT false
)

CREATE TABLE messages (
  id serial PRIMARY KEY,
  sender_id int,
  receiver_id int,
  message text NOT NULL,
  createdAt: bigint NOT NULL
)

CREATE TABLE posts (
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id),
  group_id int REFERENCES groups(id),
  content text NOT NULL,
  createdAt bigint,
  isEvent boolean,
  name varchar(40)
  location text,
  date bigint,
)

CREATE TABLE comments (
  id serial PRIMARY KEY,
  post_id REFERENCES post(id),
  user_id int REFERENCES users(id),
  message text NOT NULL,
  createdAt bigint,
  likes int DEFAULT 0
)

CREATE TABLE post_photos (
  id serial PRIMARY KEY,
  url: text,
  post_id REFERENCES post(id)
)

CREATE TABLE rsvp (
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id),
  group_id int REFERENCES groups(id),
  payment_required boolean,
  payment_amt numeric(4, 2)
)

