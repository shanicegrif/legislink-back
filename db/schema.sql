DROP DATABASE IF EXISTS legislink_db_dev;
CREATE DATABASE legislink_db_dev;

\c legislink_db_dev;

/*
*   use underscore_name for db, do not change them to camelCase.
*   table names should b plural
*/

CREATE TABLE users (
    user_uid TEXT UNIQUE NOT NULL,
    user_street TEXT,
    user_city TEXT,
    user_state TEXT,
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
    user_uid TEXT REFERENCES users(user_uid) ON DELETE CASCADE,
    answer INTEGER NOT NULL
);

--save a user's interest
CREATE TABLE keywords (
    keywords_id SERIAL PRIMARY KEY,
    user_uid TEXT REFERENCES users(user_uid) ON DELETE CASCADE,
    keywords_text TEXT NOT NULL
);

--save a user's preference on the dashboard
CREATE TABLE preferences (
    user_uid TEXT REFERENCES users(user_uid) ON DELETE CASCADE,
    preference_my_district BOOLEAN DEFAULT TRUE,
    preference_statement BOOLEAN DEFAULT TRUE,
    preference_today_vote BOOLEAN DEFAULT TRUE
);

CREATE TABLE interest_keywords (
    keywords_id SERIAL PRIMARY KEY,
    keywords_text TEXT NOT NULL
);

CREATE TABLE users_interests (
    users_interests_id SERIAL PRIMARY KEY,
    user_uid TEXT REFERENCES users(user_uid) ON DELETE CASCADE,
    users_interests_keywords TEXT
);

CREATE TABLE bill_summaries (
    bill_id TEXT NOT NULL,
    bill_summary TEXT,
    bill_summary_tags TEXT
);

CREATE TABLE senates (
    id TEXT UNIQUE NOT NULL,
    title TEXT,
    short_title TEXT,
    api_uri TEXT,
    first_name TEXT,
    middle_name TEXT,
    last_name TEXT,
    suffix TEXT,
    date_of_birth TEXT,
    gender TEXT,
    party TEXT,
    leadership_role TEXT,
    twitter_account TEXT,
    facebook_account TEXT,
    youtube_account TEXT,
    govtrack_id TEXT,
    cspan_id TEXT,
    votesmart_id TEXT,
    icpsr_id TEXT,
    google_entity_id TEXT,
    fec_candidate_id TEXT,
    url TEXT,
    res_url TEXT,
    contact_form TEXT,
    in_office BOOLEAN,
    cook_pvi TEXT,
    dw_nominate FLOAT,
    ideal_point TEXT,
    seniority TEXT,
    next_election TEXT,
    total_votes INTEGER,
    missed_votes INTEGER,
    total_present INTEGER,
    last_updated TEXT,
    ocd_id TEXT,
    office TEXT,
    phone TEXT,
    fax TEXT,
    state TEXT,
    senate_class TEXT,
    lis_id TEXT,
    missed_votes_pct FLOAT,
    votes_against_party_pct FLOAT,
    votes_with_party_pct FLOAT
);

CREATE TABLE representatives (
    id TEXT UNIQUE NOT NULL, 
    title TEXT, 
    short_title TEXT, 
    api_uri TEXT,
    first_name TEXT,
    middle_name TEXT,
    last_name TEXT,
    suffix TEXT,
    date_of_birth TEXT,
    gender TEXT,
    party TEXT,
    leadership_role TEXT,
    twitter_account TEXT,
    facebook_account TEXT, 
    youtube_account TEXT, 
    govtrack_id TEXT,
    cspan_id TEXT,
    votesmart_id TEXT, 
    icpsr_id TEXT,
    crp_id TEXT,
    google_entity_id TEXT,
    fec_candidate_id TEXT,
    url TEXT,
    res_url TEXT, 
    contact_form TEXT,
    in_office BOOLEAN,
    cook_pvi TEXT,
    dw_nominate TEXT,
    ideal_point TEXT,
    seniority TEXT,
    next_election TEXT, 
    total_votes INTEGER,
    missed_votes INTEGER,
    total_present INTEGER,
    last_updated TEXT,
    ocd_id TEXT,
    office TEXT,
    phone TEXT,
    fax TEXT,
    state TEXT,
    district TEXT,
    at_large BOOLEAN,
    geoid TEXT,
    missed_votes_pct FLOAT,
    votes_with_party_pct FLOAT,
    votes_against_party_pct FLOAT
);