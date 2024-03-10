const { default:axios } = require("axios");
const db = require("../db/dbConfig.js");

//GET "/"
/**
 * getAllRepresentatives()
 * ===========================
 * get all rows from the "representatives".
 * 
 * @returns {Object}
 */
const getAllRepresentatives = async () => {
    try {
        const senates = await db.any("SELECT * FROM representatives");
        return senates;
    } catch(err) {
        console.error(err);
    }
};

//POST
/**
 * createNewResentativesByFetching()
 * ============================
 * create new rows for senates.
 * it will fetch data for all NY representatives' info from the propublica.
 * 
 */

const createNewRepresentativesByFetching = async () => {
    async function fetchForRepresentatives(){
        return await axios.get("https://api.propublica.org/congress/v1/117/house/members.json", {headers: {
            "X-API-Key": `${process.env.PROPUBLICA_API_KEY}`,
        }});
    };
    //console.log(`${process.env.PROPUBLICA_API_KEY}`)

    fetchForRepresentatives().then(async (res) => {
        //console.log(res.data.results[0].members.filter(member => member.state === "NY"));
        let newData = res.data.results[0].members.filter(member => member.state === "NY")
        
        for(let entry of newData){
            //console.log(entry);
            const { id, title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, crp_id, google_entity_id, fec_candidate_id, url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, district, at_large, geoid, missed_votes_pct, votes_with_party_pct, votes_against_party_pct } = entry;
            console.log(entry);
            try{
                await db.one("INSERT INTO representatives (id, title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, crp_id, google_entity_id, fec_candidate_id, url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, district, at_large, geoid, missed_votes_pct, votes_with_party_pct, votes_against_party_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46)", [id, title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, crp_id, google_entity_id, fec_candidate_id, url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, district, at_large, geoid, missed_votes_pct, votes_with_party_pct, votes_against_party_pct ]);
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

/**
 * updateRepresentativeById()
 * ========================================
 * update single row.
 * 
 * @param {*} id 
 * @param {*} item 
 * @returns 
 */
const updateRepresentativeById = async(id, item) => {
    const { title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, crp_id, google_entity_id, fec_candidate_id, url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, district, at_large, geoid, missed_votes_pct, votes_with_party_pct, votes_against_party_pct } = item;
    
    try {
        const updatedQuestion = await db.one(`UPDATE representatives SET title=$1, short_title=$2, api_uri=$3, first_name=$4, middle_name=$5, last_name=$6, suffix=$7, date_of_birth=$8, gender=$9, party=$10, leadership_role=$11, twitter_account=$12, facebook_account=$13, youtube_account=$14, govtrack_id=$15, cspan_id=$16, votesmart_id=$17, icpsr_id=$18, crp_id=$19, google_entity_id=$20, fec_candidate_id=$21, url=$22, res_url=$23, contact_form=$24, in_office=$25, cook_pvi=$26, dw_nominate=$27, ideal_point=$28, seniority=$29, next_election=$30, total_votes=$31, missed_votes=$32, total_present=$33, last_updated=$34, ocd_id=$35, office=$36, phone=$37, fax=$38, state=$39, district=$40, at_large=$41, geoid=$42, missed_votes_pct=$43, votes_with_party_pct=$44, votes_against_party_pct=$45 WHERE id = ${id} RETURNING *`,[title, short_title, api_uri, first_name, middle_name, last_name, suffix, date_of_birth, gender, party, leadership_role, twitter_account, facebook_account, youtube_account, govtrack_id, cspan_id, votesmart_id, icpsr_id, crp_id, google_entity_id, fec_candidate_id, url, res_url, contact_form, in_office, cook_pvi, dw_nominate, ideal_point, seniority, next_election, total_votes, missed_votes, total_present, last_updated, ocd_id, office, phone, fax, state, district, at_large, geoid, missed_votes_pct, votes_with_party_pct, votes_against_party_pct]);
        return updatedQuestion;
    } catch(err){
        console.error(err);
    }
}

/**
 * deleteRepresentativeById()
 * ==============================
 * delete single row from representatives that is searched by id.
 * 
 * @param {*} id 
 * @returns 
 */
const deleteRepresentativeById = async(id) => {
    try {
        const deletedSenate = await db.one(`DELETE FROM representatives WHERE id = ${id} RETURNING *`);
        return deletedSenate;
    } catch(err){
        console.error(err);
    }
}

module.exports = {
    getAllRepresentatives,
    deleteRepresentativeById,
    updateRepresentativeById,
    createNewRepresentativesByFetching,
}
