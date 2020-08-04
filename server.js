const express = require('express'),
	app = express(),
	port = process.env.PORT || 8080,
	Twit = require('twit'),
	config = require('./config');

const T = new Twit(config);

//fetching users from API
//to be used in auto-complete input
app.get('/:id', (req, res) => {
	T.get('users/search', { q: req.params.id, count: 8 }, function(err, data, response) {
		res.send(data);
	});
});

//fetching tweets from API
//conditions applied to check if query is a hashtag or a user
app.get('/search_tweet/:id', (req, res) => {
	const searchQuery = req.params.id;

	if (searchQuery[0] === '#') {
		T.get(
			'search/tweets',
			{
				q          : `${req.params.id} -filter:retweets`,
				tweet_mode : 'extended',
				count      : 100
			},
			function(err, data, response) {
				res.send(data);
			}
		);
	} else {
		T.get(
			'search/tweets',
			{
				q          : `from:${searchQuery} -filter:retweets`,
				tweet_mode : 'extended',
				count      : 100
			},
			function(err, data, response) {
				res.send(data);
			}
		);
	}
});

//Only use is to pre-fill Input bar by providing username from a given screen_name
app.get('/user/:id', (req, res) => {
	T.get('users/show', { screen_name: req.params.id }, function(err, data, response) {
		res.send(data);
	});
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.listen(port, () => console.log(`App listening at port ${port}`));
