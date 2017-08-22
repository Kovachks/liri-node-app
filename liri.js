var Twitter = require('twitter');

var request = require("request");

var Spotify = require('node-spotify-api');

var TwitterKeys = require('./keys.js');

var command = process.argv[2];

var userRequest = process.argv;

var submission = "";

var client = new Twitter({
	consumer_key: TwitterKeys.twitterKeys.consumer_key,
	consumer_secret: TwitterKeys.twitterKeys.consumer_secret,
	access_token_key: TwitterKeys.twitterKeys.access_token_key,
	access_token_secret: TwitterKeys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
	id: '9e9325de360a46f48f6be3286d598b8a',
	secret: '183d724281a048738ba8d1ad71acdb2d'
});

for (var i = 3; i < userRequest.length; i += 1) {
	submission = submission + " " + userRequest[i];
}

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
	if (submission === "") {
		console.log("working")
	} else {
		spotify.search({type: 'track', query: submission, limit: 1}, function(err, data) {
				if (err) {
					return console.log('Error occured: ' + err);
				} else {
					console.log("\nArtist Name(s): " + data.tracks.items[0].album.artists[0].name)
					console.log("\nSong Name: " + data.tracks.items[0].album.name)
					console.log("\nSpotify link: " + data.tracks.href);
					console.log("\nAlbum name: " + data.tracks.items[0].album.name)
				}
			})
	}

} else if (command === 'movie-this') {
	if (submission === "") {
		request("http://www.omdbapi.com/?t=Mr.+Nobody&apikey=40e9cece", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log("\nMovie title: " + JSON.parse(body).Title);
				console.log("\nYear of Movie: " + JSON.parse(body).Year);
				console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
				console.log("\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				console.log("\nCountry of origin: " + JSON.parse(body).Country);
				console.log("\nLanguage: " + JSON.parse(body).Language);
				console.log("\nPlot: " + JSON.parse(body).Plot);
				console.log("\nActors: " + JSON.parse(body).Actors);
			}
		})
	} else {
		request("http://www.omdbapi.com/?t=" + submission+ "&apikey=40e9cece", function(error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log("\nMovie title: " + JSON.parse(body).Title);
				console.log("\nYear of Movie: " + JSON.parse(body).Year);
				console.log("\nIMDB Rating: " + JSON.parse(body).imdbRating);
				console.log("\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				console.log("\nCountry of origin: " + JSON.parse(body).Country);
				console.log("\nLanguage: " + JSON.parse(body).Language);
				console.log("\nPlot: " + JSON.parse(body).Plot);
				console.log("\nActors: " + JSON.parse(body).Actors);
			}
		})
	}
} else if (command === 'do-what-it-says') {
	console.log("Do what it says")
} else {
	console.log("Not a recognized command")
}