var Twitter = require('twitter');

var request = require("request");

var Spotify = require('node-spotify-api');


var TwitterKeys = require('./keys.js');

var command = process.argv[2];

var userRequest = process.argv;

var submission = "";

var fs = require("fs");

var client = new Twitter({
	consumer_key: TwitterKeys.twitterKeys.consumer_key,
	consumer_secret: TwitterKeys.twitterKeys.consumer_secret,
	access_token_key: TwitterKeys.twitterKeys.access_token_key,
	access_token_secret: TwitterKeys.twitterKeys.access_token_secret
});

//Variable which contains my Spotify keys
var spotify = new Spotify({
	id: '9e9325de360a46f48f6be3286d598b8a',
	secret: '183d724281a048738ba8d1ad71acdb2d'
});

//Loop to create string which contains our user inputs
for (var i = 3; i < userRequest.length; i += 1) {
	submission = submission + " " + userRequest[i];
}

//Start of if/else statement which will perform a function based off of what the user wants to run.
//runs the tweets function which will loop through and post the last 20 tweets posted by the user Keith_Kovach90
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

//will run the spotify function if the user commands it
} else if (command === 'spotify-this-song') {

	//If the user doesn't submit a song log data for The Sign by Ace of Base
	if (submission === "") {
		spotify.search({type: 'track', query: "The Sign", limit: 10}, function(err, data) {
				if (err) {
					return console.log('Error occured: ' + err);
				} else {
					console.log("\nArtist Name(s): " + data.tracks.items[5].album.artists[0].name)
					console.log("\nSong Name: " + data.tracks.items[0].name)
					console.log("\nPreview link: " + data.tracks.items[5].preview_url);
					console.log("\nAlbum name: " + data.tracks.items[5].album.name)
				}
			})
	} 

	//If the user does request a song log the data for that song here
	else {
		spotify.search({type: 'track', query: submission, limit: 1}, function(err, data) {
				if (err) {
					return console.log('Error occured: ' + err);
				} else {
					console.log("\nArtist Name(s): " + data.tracks.items[0].album.artists[0].name)
					console.log("\nSong Name: " + data.tracks.items[0].name)
					console.log("\nPreview link: " + data.tracks.items[0].preview_url);
					console.log("\nAlbum name: " + data.tracks.items[0].album.name)
				}
			})
	}

//Will run the movie function if the user calls for it
} else if (command === 'movie-this') {
	
	//If the user doesn't submit any data log the data for Mr. Nobody
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
	} 

	//Otherwise log the data that the user requested.
	else {
		request("http://www.omdbapi.com/?t=" + submission + "&apikey=40e9cece", function(error, response, body) {
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

  //On this command from the user grab the song title from the random.txt file
} else if (command === 'do-what-it-says') {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		} else {
			var songArr = data.split(",");
			spotify.search({type: 'track', query: songArr[1], limit: 1}, function(err, data) {
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
	})

  //If no command or an incorrect command is selected log this script	
} else {
	console.log("Not a recognized command")
}