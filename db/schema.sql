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

CREATE TABLE keywords {
    keywords_id SERIAL PRIMARY KEY,
    questionnaire_id INTEGER REFERENCES questionnaires(questionnaire_id) ON DELETE CASCADE,
    keywords_text TEXT NOT NULL
};

CREATE TABLE user_interesting_table {
    user_interesting_table_id SERIAL PRIMARY KEY,
    user_uid INTEGER REFERENCES users(user_uid) ON DELETE CASCADE,
    keywords_text TEXT NOT NULL
};

/*
"id": "A000360",
                 "title": "Senator, 2nd Class",
                 "short_title": "Sen.",
                 "api_uri":"https://api.propublica.org/congress/v1/members/A000360.json",
                 "first_name": "Lamar",
                 "middle_name": null,
                 "last_name": "Alexander",
                 "suffix": null,
                 "date_of_birth": "1940-07-03",
                 "gender": "M",
                 "party": "R",
                 "leadership_role": null,
                 "twitter_account": "SenAlexander",
                 "facebook_account": "senatorlamaralexander",
                 "youtube_account": "lamaralexander",
                 "govtrack_id": "300002",
                 "cspan_id": "5",
                 "votesmart_id": "15691",
                 "icpsr_id": "40304",
                 "crp_id": "N00009888",
                 "google_entity_id": "/m/01rbs3",
                 "fec_candidate_id": "S2TN00058",
                 "url": "https://www.alexander.senate.gov/public",
                 "rss_url": "https://www.alexander.senate.gov/public/?a=RSS.Feed",
                 "contact_form": "http://www.alexander.senate.gov/public/index.cfm?p=Email",
                 "in_office": true,
                 "cook_pvi": null,
                 "dw_nominate": 0.324,
                 "ideal_point": null,
                 "seniority": "17",
                 "next_election": "2020",
                 "total_votes": 374,
                 "missed_votes": 75,
                 "total_present": 0,
                 "last_updated": "2019-12-04 07:18:43 -0500",
                 "ocd_id": "ocd-division/country:us/state:tn",
                 "office": "455 Dirksen Senate Office Building",
                 "phone": "202-224-4944",
                 "fax": "202-228-3398",
                 "state": "TN",
                 "senate_class": "2",
                 "state_rank": "senior",
                 "lis_id": "S289"
                 ,"missed_votes_pct": 20.05,
                 "votes_with_party_pct": 96.98,
                 "votes_against_party_pct": 3.02
*/
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

/*
{
    "id": "B001308",
    "title": "Representative",
    "short_title": "Rep.",
    "api_uri": "https://api.propublica.org/congress/v1/members/B001308.json",
    "first_name": "Anthony",
    "middle_name": null,
    "last_name": "Brindisi",
    "suffix": null,
    "date_of_birth": "1978-11-22",
    "gender": "M",
    "party": "D",
    "leadership_role": "",
    "twitter_account": "RepBrindisi",
    "facebook_account": null,
    "youtube_account": null,
    "govtrack_id": "412806",
    "cspan_id": null,
    "votesmart_id": "135258",
    "icpsr_id": null,
    "crp_id": "N00041385",
    "google_entity_id": "/m/0hhqfyc",
    "fec_candidate_id": "H8NY22151",
    "url": "https://brindisi.house.gov",
    "rss_url": null,
    "contact_form": null,
    "in_office": false,
    "cook_pvi": "R+6",
    "dw_nominate": null,
    "ideal_point": null,
    "seniority": "2",
    "next_election": "2020",
    "total_votes": 954,
    "missed_votes": 4,
    "total_present": 0,
    "last_updated": "2021-02-08 15:12:08 -0500",
    "ocd_id": "ocd-division/country:us/state:ny/cd:22",
    "office": "329 Cannon House Office Building",
    "phone": "202-225-3665",
    "fax": null,
    "state": "NY",
    "district": "22",
    "at_large": false,
    "geoid": "3622",
    "missed_votes_pct": 0.42,
    "votes_with_party_pct": 88.82,
    "votes_against_party_pct": 11.08
}
*/
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