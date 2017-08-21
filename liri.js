var Twitter = require('twitter');

var TwitterKeys = require('./keys.js');

var command = process.argv[2];

var userRequest = process.argv[3];

var client = new Twitter({
	consumer_key: TwitterKeys.twitterKeys.consumer_key,
	consumer_secret: TwitterKeys.twitterKeys.consumer_secret,
	access_token_key: TwitterKeys.twitterKeys.access_token_key,
	access_token_secret: TwitterKeys.twitterKeys.access_token_secret
})

if (command === 'my-tweets') {
	var package = {count: 20,
				   result_type: 'recent'};
	client.get('statuses/user_timeline', package, function(error, data, response) {
		if (error) {
			console.log(error)
		} else {
			var tweets = data;
			for (var i = 0; i < 20; i += 1) {
				console.log("\n" + data[i].text)
			}
		}
	})

} else if (command === 'spotify-this-song') {
	console.log("spotify")
} else if (command === 'movie-this') {
	console.log("movie")
} else if (command === 'do-what-it-says') {
	console.log("Do what it says")
} else {
	console.log("Not a recognized command")
}