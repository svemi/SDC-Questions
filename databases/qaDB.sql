DROP DATABASE IF EXISTS qadb;

CREATE DATABASE qadb;

\c qadb;

DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE product (
  product_id varchar(10) primary key
);

DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
  question_id serial primary key,
  product_id varchar(10) references product(product_id),
  question_body text,
  question_data timestamptz,
  asker_name varchar(60),
  question_helpfullness integer default 0,
  reported boolean default false
);

DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers (
  answer_id serial primary key,
  question_id serial references questions(question_id),
  body text,
  date timestamptz,
  answerer_name varchar(50),
  helpfullness integer default 0,
  reported boolean default false
);

DROP TABLE IF EXISTS photos CASCADE ;

CREATE TABLE photos (
  id serial PRIMARY KEY,
  answer_id serial references answers(answer_id),
  url text
);