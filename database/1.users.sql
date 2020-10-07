CREATE TABLE users
(
    users_id uuid DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
    users_code CHARACTER VARYING(20),
    users_name CHARACTER VARYING(60),
    password CHARACTER VARYING(100),
    type INTEGER,
    mobile_phone_no CHARACTER VARYING(20),
    email CHARACTER VARYING(100)
);

DROP TABLE users;