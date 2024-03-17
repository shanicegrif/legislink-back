const { default:axios } = require("axios");
const db = require("../db/dbConfig.js");

const createNewBillsByFetching = async () => {
    async function fetchForBills(limit = 10, format="json", congress=118){
        return await axios.get(`https://api.congress.gov/v3/bill/${congress}?api_key=${process.env.CONGRESS_API_KEY}&limit=${limit}&format=${format}`);
    };

    fetchForBills().then(async (res) => {
        //console.log(res.data.results[0].members.filter(member => member.state === "NY"));
        let newData = res.data;
        
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