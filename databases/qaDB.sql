DROP DATABASE IF EXISTS qadb;

CREATE DATABASE qadb;

\c qadb;

CREATE USER user1;

DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE product (
  product_id integer primary key
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE product TO user1;


DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  question_id serial primary key,
  product_id integer,
  question_body text,
  question_date timestamp,
  asker_name varchar(60),
  reported boolean default false,
  question_helpfulness integer default 0
);

CREATE INDEX q_product_id_index ON questions(product_id);
CREATE INDEX q_question_id_index ON questions(question_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE questions TO user1;

DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers (
  answer_id serial primary key,
  question_id serial,
  body text,
  date timestamp,
  answerer_name varchar(50),
  reported boolean default false,
  helpfulness integer default 0
);

CREATE INDEX a_question_id_index ON answers(question_id);
CREATE INDEX a_answer_id_index ON answers(answer_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE answers TO user1;

DROP TABLE IF EXISTS photos CASCADE ;

CREATE TABLE photos (
  id serial PRIMARY KEY,
  answer_id serial,
  url text
);

CREATE INDEX p_answer_id_index ON photos(answer_id);
CREATE INDEX p_id_index ON photos(id);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE photos TO user1;
