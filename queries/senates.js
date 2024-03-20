/*
CREATE TABLE senates {
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
};
*/

const { default:axios } = require("axios");
const db = require("../db/dbConfig.js");

//GET "/"
/**
 * getAllSenates()
 * ===========================
 * get all rows from the "senates".
 * 
 * @returns {Object}
 */
const getAllSenates = async () => {
    try {
        const senates = await db.any("SELECT * FROM senates");
        return senates;
    } catch(err) {
        console.error(err);
    }
};

//POST
/**
 * createNewSenatesByFetching()
 * ============================
 * create new rows for the "senates" in NY.
 * 
 * @returns 
 */

const createNewSenatesByFetching = async () => {
    async function fetchForSenates(){
        return await axios.get("https://api.propublica.org/congress/v1/118/senate/members.json", {headers: {
            "X-API-Key": `${process.env.PROPUBLICA_API_KEY}`,
        }});
    };
    //console.log(`${process.env.PROPUBLICA_API_KEY}`)

    fetchForSenates().then(async (res) => {
        //console.log(res.data.results[0].members.filter(member => member.state === "NY"));
        let newData = res.data.results[0].members.filter(member => member.state === "NY")
        
        for(let entry of newData){
            //console.log(entry);
            const { id, title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, google_entity_id, fec_candidate_id,url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, senate_class, lis_id, missed_votes_pct, votes_against_party_pct, votes_with_party_pct } = entry;
            console.log(entry);
            try{
                await db.one("INSERT INTO senates (id, title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, google_entity_id, fec_candidate_id,url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, senate_class, lis_id, missed_votes_pct, votes_against_party_pct, votes_with_party_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44)", [id, title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, google_entity_id, fec_candidate_id,url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, senate_class, lis_id, missed_votes_pct, votes_against_party_pct, votes_with_party_pct]);
            } catch(err){
                console.error(err);
            };
        }
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
    }});

    //console.log(datas)
    
}


const updateSenateById = async(id, item) => {
    const { title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, google_entity_id, fec_candidate_id,url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, senate_class, lis_id, missed_votes_pct, votes_against_party_pct, votes_with_party_pct } = item;
    
    try {
        const updatedQuestion = await db.one(`UPDATE senates SET title=$1, short_title=$2, api_uri=$3, first_name=$4, middle_name=$5, last_name=$6, suffix=$7, date_of_birth=$8, gender=$9, party=$10, leadership_role=$11, twitter_account=$12, facebook_account=$13, youtube_account=$14, govtrack_id=$15, cspan_id=$16, votesmart_id=$17, icpsr_id=$18, google_entity_id=$19, fec_candidate_id,url=$20, res_url=$21, contact_form=$22, in_office=$23, cook_pvi=$24, dw_nominate=$25, ideal_point=$26, seniority=$27, next_election=$28, total_votes=$29, missed_votes=$30, total_present=$31, last_updated=$32, ocd_id=$33, office=$34, phone=$35, fax=$36, state=$37, senate_class=$38, lis_id=$39, missed_votes_pct=$40, votes_against_party_pct=$41, votes_with_party_pct=$42 WHERE id = ${id} RETURNING *`,[title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, google_entity_id, fec_candidate_id,url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, senate_class, lis_id, missed_votes_pct, votes_against_party_pct, votes_with_party_pct]);
        return updatedQuestion;
    } catch(err){
        console.error(err);
    }
}

//DELETE "/:id"
const deleteSenateById = async(id) => {
    try {
        const deletedSenate = await db.one(`DELETE FROM senates WHERE id = ${id} RETURNING *`);
        return deletedSenate;
    } catch(err){
        console.error(err);
    }
}

module.exports = {
    getAllSenates,
    deleteSenateById,
    updateSenateById,
    createNewSenatesByFetching,
}