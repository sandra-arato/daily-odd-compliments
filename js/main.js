var timer;
var play = true;

// array of compliments that will be pulled from Facebook later
var comp = [
	"The first time we met, I was like, \'Well, this person seems cool.\' And now I\'m like, \'I literally think you can read my mind.\'",
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
];

function pauseAndPlay (p) {
	play = !play;
	// when p = true, it runs currently, so it has to be stopped
	if (!p) {
		$("#button").html("Pause").css("background-color", "#ec173a");
		clipCompliment($("#current"));
	}
	else {
		clearInterval(timer);
		$("#button").html("Play").css("background-color", "#008b00");	
	}
}


function findTopDiv (callback) {
	var indexHighest = 0;
	var currentDiv;
	$("#button").css("visibility", "visible");
	// check which div is on the top
	$("#container div").each(function() {
		var indexCurrent = parseInt($(this).css("z-index"));
		if (indexCurrent > indexHighest) {
			indexHighest = indexCurrent;
			currentDiv = this;
		}
	});

	// the id "current" is added to the div that is on the top
	$(currentDiv).attr("id", "current");
	// this is where the clipping of the top element starts. callback function is clipCompliment
	callback($("#current"));
}

function clipCompliment (c) {
	// the #current top div is passed as an argument to the function
	// the function gets the dimensions of the 'c' div to use them in the css property clip
	var data = $(c).css("clip");
	var w = parseInt($(window).width());
	var h = parseInt($(c).height(), 10);
	var p = parseInt($(c).css("padding-top")) + parseInt($(c).css("padding-bottom"));
	h = h + p + 1 ;
	var z = parseInt($(c).css("z-index"));
	var i = 0;

	// the following condition tests if the clipping is continous - (it already started before)
	// if yes, it will overwrite the clipping variables to the current point of clipping
	if (play && data !== "auto") {
		var dim = data.slice(5, data.length -1);
		dim = dim.split("px ");
		i = parseInt(dim[0]);
		w = parseInt(dim[1]);
		h = parseInt(dim[2]);
		p = parseInt($(c).css("padding-top")) + parseInt($(c).css("padding-bottom"));
		h = h + p;
	};

	// clipping only occures if the c div is not the last one. 
	// if it's the last div among the compliments, it just stops
	if (!($(c).hasClass("last"))) {
		timer = setInterval(function () {
			$(c).css("clip", "rect(" + i +"px, "+ w + "px, " + h + "px, 0px)");
			i++;
			// when the clipping is finished, the clipped part equals the original height
			if (i == h || i > h) {
				$(c).css("z-index", z * (-1) ); // move current to the back
				$(c).css("clip", "rect(0px, "+ w + "px, " + h + "px, 0px)"); // restore height
				$(c).removeAttr("id"); // get rid of "current" id
				clearInterval(timer); // stop running clip
				setTimeout(function () { findTopDiv(clipCompliment); }, 3400); // start next one
			}
		}, 28);
	};
}

function randomColor () {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

function createComplimentDivs () {
	var color = [];
	for (var i=0, len=comp.length; i<len; i++) {
		var c = $.parseHTML("<div class='compliment'>" + comp[i] + "</div>");
		$("#container").append(c);
		$(c).css({
			"position": "absolute",
			"visibility": "visible",
			"height": "6.8em",
			"margin": "0",
			"padding": "3em auto 2em 5em",
			"font-size": "170%",
			"background-color": randomColor(),
			"z-index": 100-i
		});
		if ( i == len - 1 ) {
			$(c).addClass("last");
		};
	}
}

function resizeCheck() {
	if ($(window).width() < 510) {
		$("#container div").css("height", "9.2em");
	}
	else if ($(window).width() < 725) {
		$("#container div").css({
			height: "7.8em",
		});
	}
	else {
		$("#container div").css({
				height: "6.8em"
			});
	}
}

function initialize() {

	// sort compliments based on text length: 
	comp = $.map(comp, function(val, i) {
		if (comp[i].length <= 140) { return val; }
	});

	// create divs with compliments in them
	createComplimentDivs();
	resizeCheck();
	// remove top compliment div with clipping method, one after another
	timer = setTimeout(function () { findTopDiv(clipCompliment); }, 3400);
	// when user clicks on the button, browser stops or continues clipping
	$("#button").click(play, function() { pauseAndPlay(play);});
	$(window).resize(function () { resizeCheck(); });


}

$(document).ready(initialize);