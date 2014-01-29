var comp;

var compliments = [
	"The first time we met, I was like, \'Well, this person seems cool.\' And now I\'m like, \'I literally think you can read my mind.",
	"Your sense of humor is fantastic. And by that I mean you laugh at my jokes. Which is fantastic.",
	"Being an adult is hard sometimes. And on days like that, it\'s nice to know that I can throw a childish tantrum and you won\'t judge me for it.",
	"I like having you as my friend because I can say things like, \'Pay attention to me!\' And you\'ll actually do it. And I appreciate that.",
	"With you I feel like I have a childish crush that\'s quickly growing up.",
	"You make everything better. And if people were more like you, everything would be better.",
	"I wish I could read your mind so I can know what you\'re thinking because I think I\'m thinking it, too." ,
	"I don\'t really have a favorite color. It\'s pretty much just whatever you\'re wearing that day.",
	"I bet if you made the porridge for the three bears, Goldilocks would have been like, \'This is some delicious porridge. I\'m glad there are three bowls of it.\'",
	"Whenever you walk into a room it\'s like receiving that long straight piece in Tetris. Everyone\'s just like, \'Aww yeah! Things are about to get good now.\'",
	"I look at you the same way we all look at giraffes. Which is basically like, \'I bet you were just born awesome.\'",
	"After we first met, I wanted to know more about you, but I couldn\'t remember your name, so I looked up \'Beautiful.\'",
	"You smell so good, I wish I could wax your scent into a candle. On a related note, I have no idea how candles are made."
]

function randomColor () {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

function sortCompliments () {
	comp = [];
	for (i=0, len=compliments.length; i<len; i++) {
		var n = compliments[i].length;
		if (n <= 140) {
			comp.push(compliments[i]);
		};
	}
}

function createComplimentDivs () {
	var color = [];
	for (i=0, len=comp.length; i<len; i++) {
		var c = $.parseHTML("<div class='compliment'>" + comp[i] + "</div>");
			$("#container").append(c);
			$(c).css({
				// "position": "absolute",
				"width": "100%",
				"margin": "0",
				"padding": "3em auto 2em 6em",
				"background-color": randomColor(),
				"color": "#ffffff"
			})
			c
		}

}

// window.fbAsyncInit = function() {
// 	FB.init({
// 		appId: '516347275130300', // App ID
// 		channelUrl: 'http://sandraszenti.github.io/daily-odd-compliments/channel.html',
// 		status: true, // check login status
// 		cookie: true, // enable cookies to allow the server to access the session
// 		xfbml: true  // parse XFBML
// 	});
  
// 	// $.ajax( {
// 	// 	dataType: "json",
// 	// 	url: "https://www.facebook.com/feeds/page.php?id=342691952483262&format=json",
// 	// 	success: function() {
// 	// 				console.log("ajax call success");
// 	// 				console.log(data);
// 	// 	}
// 	// })
// 	// .done( function() { console.log("should be done");});
// 	console.log("Facebook setup completed. Start fetching now...");
// }

function initialize() {
	sortCompliments();
	createComplimentDivs();
}

$(document).ready(initialize);