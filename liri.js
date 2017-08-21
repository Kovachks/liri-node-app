var keys = require('./keys.js');

var command = process.argv[2];

if (command === 'my-tweets') {
	console.log("twitter")
} else if (command === 'spotify-this-song') {
	console.log("spotify")
} else if (command === 'movie-this') {
	console.log("movie")
} else if (command === 'do-what-it-says') {
	console.log("Do what it says")
} else {
	console.log("Not a recognized command")
}