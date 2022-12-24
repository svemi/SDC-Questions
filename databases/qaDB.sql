DROP DATABASE IF EXISTS qadb;

CREATE DATABASE qadb;

\c qadb;

CREATE USER user1;

DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE product (
  product_id varchar(10) primary key
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE product TO user1;


DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  question_id serial primary key,
  product_id varchar(10),
  question_body text,
  question_date timestamptz,
  asker_name varchar(60),
  reported boolean default false,
  question_helpfullness integer default 0
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE questions TO user1;

-- COPY questions
-- FROM '/Users/saivemireddy/SDC/DolchyGabbana/data/questions_test.csv'
-- DELIMITER ','
-- CSV HEADER;

DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers (
  answer_id serial primary key,
  question_id serial references questions(question_id),
  body text,
  date timestamptz,
  answerer_name varchar(50),
  reported boolean default false,
  helpfullness integer default 0
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE answers TO user1;

DROP TABLE IF EXISTS photos CASCADE ;

CREATE TABLE photos (
  id serial PRIMARY KEY,
  answer_id serial references answers(answer_id),
  url text
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE photos TO user1;

-- COPY photos
-- FROM '/Users/saivemireddy/SDC/DolchyGabbana/data/answers_photos.csv'
-- DELIMITER ','
-- CSV HEADER;