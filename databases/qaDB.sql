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
  question_date varchar(30),
  asker_name varchar(60),
  asker_email varchar(100),
  reported boolean default false,
  question_helpfulness integer default 0
);

CREATE INDEX q_product_id_index ON questions(product_id);
CREATE INDEX q_question_id_index ON questions(question_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE questions TO user1;
GRANT USAGE, SELECT ON SEQUENCE questions_question_id_seq TO user1;

DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers (
  answer_id serial primary key,
  question_id serial,
  body text,
  date varchar(30),
  answerer_name varchar(50),
  answerer_email varchar(100),
  reported boolean default false,
  helpfulness integer default 0
);

CREATE INDEX a_question_id_index ON answers(question_id);
CREATE INDEX a_answer_id_index ON answers(answer_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE answers TO user1;

GRANT USAGE, SELECT ON SEQUENCE answers_answer_id_seq TO user1;

DROP TABLE IF EXISTS photos CASCADE ;

CREATE TABLE photos (
  id serial PRIMARY KEY,
  answer_id serial,
  url text
);

CREATE INDEX p_answer_id_index ON photos(answer_id);
CREATE INDEX p_id_index ON photos(id);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE photos TO user1;
GRANT USAGE, SELECT ON SEQUENCE photos_id_seq TO user1;

COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
FROM '/Users/saivemireddy/SDC/DolchyGabbana/data/questions.csv' DELIMITER ',' CSV HEADER;

COPY answers(answer_id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
FROM '/Users/saivemireddy/SDC/DolchyGabbana/data/answers.csv' DELIMITER ',' CSV HEADER;

COPY photos(id, answer_id, url)
FROM '/Users/saivemireddy/SDC/DolchyGabbana/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

UPDATE questions
SET question_date = TO_TIMESTAMP(question_date::bigint / 1000)::timestamp;

UPDATE answers
SET date = TO_TIMESTAMP(date::bigint / 1000)::timestamp;


ALTER SEQUENCE questions_question_id_seq RESTART WITH 3518964;
ALTER SEQUENCE answers_answer_id_seq RESTART WITH 6879307;
ALTER SEQUENCE photos_id_seq RESTART WITH 2063760;
