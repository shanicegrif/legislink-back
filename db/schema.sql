DROP DATABASE IF EXISTS legislink_db_dev;
CREATE DATABASE legislink_db_dev;

\c legislink_db_dev;

/*
*   use underscore_name for db, do not change them to camelCase.
*   table names should b plural
*/

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_uid TEXT NOT NULL,
    user_zip TEXT
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

--save a user's interest
CREATE TABLE keywords (
    keywords_id SERIAL PRIMARY KEY,
    user_uid INTEGER REFERENCES users(user_uid) ON DELETE CASCADE,
    keywords_text TEXT NOT NULL
);

CREATE TABLE interest_keywords (
    keywords_id SERIAL PRIMARY KEY,
    keywords_text TEXT NOT NULL
);

CREATE TABLE users_interests (
    users_interests_id SERIAL PRIMARY KEY,
    user_uid INTEGER REFERENCES users(user_uid) ON DELETE CASCADE,
    users_interests_keywords TEXT
);

CREATE TABLE members (
    bioguide_id TEXT NOT NULL,
    member_type TEXT NOT NULL
);