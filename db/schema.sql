DROP DATABASE IF EXISTS legislink_db_dev;
CREATE DATABASE legislink_db_dev;

\c legislink_db_dev;

/*
*   use underscore_name for db, do not change them to camelCase.
*   table names should b plural
*/

/*
    TODO: use COMMENT when we have time.
        need more tables to store other data.
*/
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(40) NOT NULL,
    user_zipcode INTEGER NOT NULL,
    manager BOOLEAN
);
