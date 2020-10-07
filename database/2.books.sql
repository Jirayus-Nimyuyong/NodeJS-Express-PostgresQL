CREATE TABLE books
(
    books_id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
    books_code CHARACTER VARYING(20),
    books_name CHARACTER VARYING(60)
);

DROP TABLE books;