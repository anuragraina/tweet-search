require('dotenv').config();

module.exports = {
	consumer_key        : process.env.API_CONSUMER_KEY,
	consumer_secret     : process.env.API_CONSUMER_SECRET,
	access_token        : process.env.API_ACCESS_TOKEN,
	access_token_secret : process.env.API_ACCESS_TOKEN_SECRET
};
