--cant run in node, need to manually input in psql productsdb
psql productsdb

DROP TABLE IF EXISTS product, related, styles, skus, characteristics, photos, features CASCADE;

CREATE TABLE product (
    id integer primary key,
    name text,
    slogan text,
    description text,
    category text,
    default_price integer
);

COPY product
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/Gaviali/SDC-files/product.csv'
DELIMITER ','
CSV HEADER;

GRANT SELECT, UPDATE, DELETE, INSERT on product to christopherwong;

CREATE TABLE related (
  id integer primary key,
  current_product_id integer,
  related_product_id integer,
  FOREIGN KEY (current_product_id)
  REFERENCES product(id)
);

COPY related
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/Gaviali/SDC-files/related.csv'
DELIMITER ','
CSV HEADER;

GRANT SELECT, UPDATE, DELETE, INSERT on related to christopherwong;

CREATE TABLE styles (
  id integer primary key,
  productId integer,
  name text,
  sale_price text,
  original_price text,
  default_style integer,
  FOREIGN KEY (productId)
  REFERENCES product(id)
);

COPY styles
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/Gaviali/SDC-files/styles.csv'
DELIMITER ','
CSV HEADER;

GRANT SELECT, UPDATE, DELETE, INSERT on styles to christopherwong;

CREATE TABLE skus (
  id integer primary key,
  styleId integer,
  size text,
  quantity integer,
  FOREIGN KEY (styleId)
  REFERENCES styles(id)
);

COPY skus
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/Gaviali/SDC-files/skus.csv'
DELIMITER ','
CSV HEADER;

GRANT SELECT, UPDATE, DELETE, INSERT on skus to christopherwong;

CREATE TABLE characteristics (
  id integer primary key,
  product_id integer,
  name text,
  FOREIGN KEY (product_id)
  REFERENCES product(id)
);

COPY characteristics
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/Gaviali/SDC-files/characteristics.csv'
DELIMITER ','
CSV HEADER;

GRANT SELECT, UPDATE, DELETE, INSERT on characteristics to christopherwong;

CREATE TABLE photos (
  id integer primary key,
  styleId integer,
  url text,
  thumbnail_url text,
  FOREIGN KEY (styleId)
  REFERENCES styles(id)
);

COPY photos
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/Gaviali/SDC-files/photos.csv'
DELIMITER ','
CSV HEADER;

GRANT SELECT, UPDATE, DELETE, INSERT on photos to christopherwong;

CREATE TABLE features  (
  id integer primary key,
  product_id integer,
  feature text,
  value text,
  FOREIGN KEY (product_id)
  REFERENCES product(id)
);

COPY features
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/Gaviali/SDC-files/features.csv'
DELIMITER ','
CSV HEADER;

GRANT SELECT, UPDATE, DELETE, INSERT on features to christopherwong;

-- DROP DATABASE IF EXISTS productsDB;

-- CREATE DATABASE productsDB;

-- USE productsDB;

-- CREATE TYPE afeature AS (
--     feature text,
--     aValue text
-- );
-- CREATE TABLE product (
--     id integer primary key,
--     aName text,
--     slogan text,
--     aDescription text,
--     category text,
--     default_price text,
--     features afeature[]
-- );

-- CREATE TYPE athing AS (
--     quantity integer,
--     size text
-- );
-- CREATE TYPE asku AS (
--     integer athing
-- );
-- CREATE TYPE aphoto AS (
--     thumbail_url text,
--     aUrl text
-- );
-- CREATE TYPE aresult AS (
--     style_id integer,
--     aName text,
--     original_price text,
--     sale_price text,
--     aDefault boolean,
--     photos aphoto[],
--     skus asku
-- );
-- CREATE TABLE styles (
--     product_id integer primary key,
--     results aresult[]
-- );
-- CREATE TABLE related (
--     int_array integer[]
-- );
