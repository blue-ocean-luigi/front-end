DROP DATABASE IF EXISTS crossing;
CREATE DATABASE crossing;
\c crossing

CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar(20) NOT NULL,
  password varchar(20) NOT NULL,
  firstName varchar(20) NOT NULL,
  lastName varchar(20) NOT NULL,
  email varchar(30) NOT NULL,
  aboutme text,
  picture text
);

CREATE TABLE groups (
  id serial PRIMARY KEY,
  name varchar(40) NOT NULL,
  about text,
  state varchar(20) NOT NULL,
  city varchar(20) NOT NULL,
  zip int NOT NULL
);

CREATE TABLE group_members (
  id serial PRIMARY KEY,
  group_id int REFERENCES groups(id),
  user_id int REFERENCES users(id),
  admin boolean
);

CREATE TABLE group_requests (
  id serial PRIMARY KEY,
  group_id int REFERENCES groups(id),
  requester_id int REFERENCES users(id),
  message text
);
-- delete when approved

CREATE TABLE friends (
  id serial PRIMARY KEY,
  friend1 int NOT NULL,
  friend2 int NOT NULL,
  status boolean DEFAULT false
);
-- 2 queries

CREATE TABLE messages (
  id serial PRIMARY KEY,
  sender_id int,
  receiver_id int,
  message text NOT NULL,
  createdAt timestamp DEFAULT now()
);

CREATE TABLE posts (
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id),
  group_id int REFERENCES groups(id),
  content text NOT NULL,
  createdAt timestamp DEFAULT now(),
  isEvent boolean DEFAULT false,
  name varchar(40),
  state varchar(20) NOT NULL,
  city varchar(20) NOT NULL,
  zip int NOT NULL,
  startTime int,
  startDate date,
  endTime int,
  endDate date
);

CREATE TABLE comments (
  id serial PRIMARY KEY,
  post_id int REFERENCES posts(id),
  user_id int REFERENCES users(id),
  message text NOT NULL,
  createdAt date DEFAULT now()
);
-- future, add likes and like table

CREATE TABLE post_photos (
  id serial PRIMARY KEY,
  url text,
  post_id int REFERENCES posts(id)
);

CREATE TABLE rsvp (
  id serial PRIMARY KEY,
  post_id int REFERENCES posts(id),
  user_id int REFERENCES users(id),
  payment_required boolean,
  payment_amt numeric(4, 2)
);

\q
