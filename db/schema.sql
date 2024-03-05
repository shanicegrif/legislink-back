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
    TODO: { email, displayName, photoURL, uid }
*/
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_email TEXT UNIQUE NOT NULL,
    user_display_name TEXT,
    user_photoURL TEXT,
    user_uid TEXT NOT NULL
);

--not confirmed
CREATE TABLE questionnaires (
    questionnaire_id SERIAL PRIMARY KEY,
    questionnaire_topic TEXT
);

--not confirmed
CREATE TABLE answers (
    answer_id SERIAL PRIMARY KEY,
    questionnaire_id INTEGER REFERENCES questionnaires(questionnaire_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    answer INTEGER NOT NULL
);

