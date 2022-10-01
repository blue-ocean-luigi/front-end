DROP DATABASE IF EXISTS crossing;
CREATE DATABASE crossing;
\c crossing

CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar(20) NOT NULL UNIQUE,
  password varchar(20) NOT NULL,
  firstName varchar(20) NOT NULL,
  lastName varchar(20) NOT NULL,
  email varchar(30) NOT NULL UNIQUE,
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
  state varchar(20),
  city varchar(20),
  zip int,
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
  payment_required boolean DEFAULT false,
  payment_amt numeric(4, 2)
);


COPY comments
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/comments.csv' DELIMITER ',' CSV HEADER;
COPY friends
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/friends.csv' DELIMITER ',' CSV HEADER;
COPY group_members
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/group_members.csv' DELIMITER ',' CSV HEADER;
COPY group_request
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/group)request.csv' DELIMITER ',' CSV HEADER;
COPY groups
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/groups.csv' DELIMITER ',' CSV HEADER;
COPY messages
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/messages.csv' DELIMITER ',' CSV HEADER;
COPY post_photos
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/post_photos.csv' DELIMITER ',' CSV HEADER;
COPY posts
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/posts.csv' DELIMITER ',' CSV HEADER;
COPY rsvp
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/rsvp.csv' DELIMITER ',' CSV HEADER;
COPY users
FROM '/Users/kevinpho/Desktop/JS/Immersive/blue-ocean/back-end/back-end/db/dummydata/users.csv' DELIMITER ',' CSV HEADER;

SELECT setval('comments_id_seq', COALESCE((SELECT MAX(id)+1 FROM comments), 1), false);
SELECT setval('friends_id_seq', COALESCE((SELECT MAX(id)+1 FROM friends), 1), false);
SELECT setval('group_members_id_seq', COALESCE((SELECT MAX(id)+1 FROM group_members), 1), false);
SELECT setval('group_request_id_seq', COALESCE((SELECT MAX(id)+1 FROM group_request), 1), false);
SELECT setval('groups_id_seq', COALESCE((SELECT MAX(id)+1 FROM groups), 1), false);
SELECT setval('messages_id_seq', COALESCE((SELECT MAX(id)+1 FROM messages), 1), false);
SELECT setval('post_photos_id_seq', COALESCE((SELECT MAX(id)+1 FROM post_photos), 1), false);
SELECT setval('posts_id_seq', COALESCE((SELECT MAX(id)+1 FROM posts), 1), false);
SELECT setval('rsvp_id_seq', COALESCE((SELECT MAX(id)+1 FROM rsvp), 1), false);
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id)+1 FROM users), 1), false);

\q

