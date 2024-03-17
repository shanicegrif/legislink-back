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
CREATE TABLE keywords {
    keywords_id SERIAL PRIMARY KEY,
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

/* table for bills */
/* adds tags */
/*
    "congress": 118,
            "latestAction": {
                "actionDate": "2024-03-15",
                "text": "Placed on the Union Calendar, Calendar No. 352."
            },
            "number": "766",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Dr. Michael C. Burgess Preventive Health Savings Act",
            "type": "HR",
            "updateDate": "2024-03-16",
            "updateDateIncludingText": "2024-03-16T10:38:12Z",
            "url": "https://api.congress.gov/v3/bill/118/hr/766?format=json"
        },
 */

 /*
 "bill": {
        "actions": {
            "count": 8,
            "url": "https://api.congress.gov/v3/bill/118/hr/766/actions?format=json"
        },
        //Container for Congressional Budget Office (CBO) cost estimates associated with a bill or resolution. Read about CBO on Congress.gov
        "cboCostEstimates": [
            {
                "description": "As ordered reported by the House Committee on the Budget on February 6, 2024\n",
                "pubDate": "2024-02-15T19:06:00Z",
                "title": "H.R. 766, Dr. Michael C. Burgess Preventive Health Savings Act",
                "url": "https://www.cbo.gov/publication/59987"
            }
        ],
        "committees": {
            "count": 1,
            "url": "https://api.congress.gov/v3/bill/118/hr/766/committees?format=json"
        },
        "congress": 118,
        "constitutionalAuthorityStatementText": "<pre>\n[Congressional Record Volume 169, Number 22 (Thursday, February 2, 2023)]\n[House]\nFrom the Congressional Record Online through the Government Publishing Office [<a href=\"https://www.gpo.gov\">www.gpo.gov</a>]\nBy Mr. BURGESS:\nH.R. 766.\nCongress has the power to enact this legislation pursuant\nto the following:\nArticle 1, Section 8\nThe single subject of this legislation is:\nRequires CBO to consider possible reductions in budget\noutlays for preventative health services outside the 10-year\nbudget window.\n[Page H681]\n</pre>",
        "cosponsors": {
            "count": 29,
            "countIncludingWithdrawnCosponsors": 29,
            "url": "https://api.congress.gov/v3/bill/118/hr/766/cosponsors?format=json"
        },
        "introducedDate": "2023-02-02",
        "latestAction": {
            "actionDate": "2024-03-15",
            "text": "Placed on the Union Calendar, Calendar No. 352."
        },
        "number": "766",
        "originChamber": "House",
        "originChamberCode": "H",
        "policyArea": {
            "name": "Economics and Public Finance"
        },
        "relatedBills": {
            "count": 1,
            "url": "https://api.congress.gov/v3/bill/118/hr/766/relatedbills?format=json"
        },
        "sponsors": [
            {
                "bioguideId": "B001248",
                "district": 26,
                "firstName": "Michael",
                "fullName": "Rep. Burgess, Michael C. [R-TX-26]",
                "isByRequest": "N",
                "lastName": "Burgess",
                "middleName": "C.",
                "party": "R",
                "state": "TX",
                "url": "https://api.congress.gov/v3/member/B001248?format=json"
            }
        ],
        "subjects": {
            "count": 8,
            "url": "https://api.congress.gov/v3/bill/118/hr/766/subjects?format=json"
        },
        "summaries": {
            "count": 1,
            "url": "https://api.congress.gov/v3/bill/118/hr/766/summaries?format=json"
        },
        "textVersions": {
            "count": 2,
            "url": "https://api.congress.gov/v3/bill/118/hr/766/text?format=json"
        },
        "title": "Dr. Michael C. Burgess Preventive Health Savings Act",
        "titles": {
            "count": 4,
            "url": "https://api.congress.gov/v3/bill/118/hr/766/titles?format=json"
        },
        "type": "HR",
        "updateDate": "2024-03-16T23:15:24Z",
        "updateDateIncludingText": "2024-03-16T23:15:24Z"
    },
    "request": {
        "billNumber": "766",
        "billType": "hr",
        "congress": "118",
        "contentType": "application/json",
        "format": "json"
    }
 */

 /*
    {
    "pagination": {
        "count": 1
    },
    "request": {
        "billNumber": "766",
        "billType": "hr",
        "billUrl": "https://api.congress.gov/v3/bill/118/hr/766?format=json",
        "congress": "118",
        "contentType": "application/json",
        "format": "json"
    },
    "summaries": [
        {
            "actionDate": "2023-02-02",
            "actionDesc": "Introduced in House",
            "text": " <p><b>Preventive Health Savings Act</b></p> <p>This bill requires the Congressional Budget Office (CBO), upon receiving a request from Congress, to determine if proposed legislation would reduce spending outside of the 10-year budget window through the use of preventive health and preventive health services. </p> <p>If CBO determines that the legislation would result in substantial spending reductions from the use of preventive health and preventive health services, a description and estimate of the spending reductions must be included in CBO projections. </p>",
            "updateDate": "2023-02-24T21:38:31Z",
            "versionCode": "00"
        }
    ]
}
  */

/*
{
    "pagination": {
        "count": 2
    },
    "request": {
        "billNumber": "766",
        "billType": "hr",
        "billUrl": "https://api.congress.gov/v3/bill/118/hr/766?format=json",
        "congress": "118",
        "contentType": "application/json",
        "format": "json"
    },
    "textVersions": [
        {
            "date": "2024-03-15T04:00:00Z",
            "formats": [
                {
                    "type": "Formatted Text",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766rh.htm"
                },
                {
                    "type": "PDF",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766rh.pdf"
                },
                {
                    "type": "Formatted XML",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766rh.xml"
                }
            ],
            "type": "Reported in House"
        },
        {
            "date": "2023-02-02T05:00:00Z",
            "formats": [
                {
                    "type": "Formatted Text",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766ih.htm"
                },
                {
                    "type": "PDF",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766ih.pdf"
                },
                {
                    "type": "Formatted XML",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766ih.xml"
                }
            ],
            "type": "Introduced in House"
        }
    ]
}
 */
CREATE TABLE bills (
    congress TEXT, --currently 118th
    bills_id SERIAL PRIMARY KEY,
    bills_latest_action_date TEXT, --latest update from the congress
    cills_latest_action_description TEXT,
    bills_number TEXT, --bills number should b unique
    originChamber TEXT, --where is the bill come from?
    bills_update_date TEXT, --when we update this bill in our db

    bills_action_count TEXT,
    bills_action_url TEXT,
    bills_committees_count TEXT,
    bills_committees_url TEXT,
    bills_constitutionalAuthorityStatementText TEXT,
    bills_cosponsors_count TEXT,
    bills_cosponsors_countIncludingWithdrawnCosponsors TEXT,
    bills_cosponsors_url TEXT,
    
    bills_introduced_date TEXT,
    bills_latest_action_date TEXT,
    bills_latest_action_text TEXT,

    bills_policy_area_name TEXT,
    
    bills_title TEXT,

);

/*
    "cboCostEstimates": [
            {
                "description": "As ordered reported by the House Committee on the Budget on February 6, 2024\n",
                "pubDate": "2024-02-15T19:06:00Z",
                "title": "H.R. 766, Dr. Michael C. Burgess Preventive Health Savings Act",
                "url": "https://www.cbo.gov/publication/59987"
            }
        ],
*/
CREATE TABLE bill_cbo_cost_estimates (
    bill_cbo_cost_estimates_id SERIAL PRIMARY KEY,
    bill_number TEXT,
    bill_cbo_cost_estimates_description TEXT,
    bill_cbo_cost_estimates_publish_date TEXT,
    bill_cbo_cost_estimates_title TEXT,
    bill_cbo_cost_estimates_url TEXT
);

/* 
"sponsors": [
            {
                "bioguideId": "B001248",
                "district": 26,
                "firstName": "Michael",
                "fullName": "Rep. Burgess, Michael C. [R-TX-26]",
                "isByRequest": "N",
                "lastName": "Burgess",
                "middleName": "C.",
                "party": "R",
                "state": "TX",
                "url": "https://api.congress.gov/v3/member/B001248?format=json"
            }
        ],
*/
CREATE TABLE bill_sponsors (
    bill_sponsors_id SERIAL PRIMARY KEY,
    bill_number TEXT,
    bill_bioguide_id TEXT
);

/*
    "summaries": [
        {
            "actionDate": "2023-02-02",
            "actionDesc": "Introduced in House",
            "text": " <p><b>Preventive Health Savings Act</b></p> <p>This bill requires the Congressional Budget Office (CBO), upon receiving a request from Congress, to determine if proposed legislation would reduce spending outside of the 10-year budget window through the use of preventive health and preventive health services. </p> <p>If CBO determines that the legislation would result in substantial spending reductions from the use of preventive health and preventive health services, a description and estimate of the spending reductions must be included in CBO projections. </p>",
            "updateDate": "2023-02-24T21:38:31Z",
            "versionCode": "00"
        }
    ]
 */

CREATE TABLE bill_summaries (
    bill_summaries_id SERIAL PRIMARY KEY,
    bill_number TEXT,
    bill_summaries_action_date TEXT,
    bill_summaries_action_description TEXT,
    bill_summaries_text TEXT,
    bill_summaries_update_date TEXT
);

 /*
"textVersions": [
        {
            "date": "2024-03-15T04:00:00Z",
            "formats": [
                {
                    "type": "Formatted Text",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766rh.htm"
                },
                {
                    "type": "PDF",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766rh.pdf"
                },
                {
                    "type": "Formatted XML",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766rh.xml"
                }
            ],
            "type": "Reported in House"
        },
        {
            "date": "2023-02-02T05:00:00Z",
            "formats": [
                {
                    "type": "Formatted Text",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766ih.htm"
                },
                {
                    "type": "PDF",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766ih.pdf"
                },
                {
                    "type": "Formatted XML",
                    "url": "https://www.congress.gov/118/bills/hr766/BILLS-118hr766ih.xml"
                }
            ],
            "type": "Introduced in House"
        }
    ]
 */