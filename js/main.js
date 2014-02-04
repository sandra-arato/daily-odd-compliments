var comp;
var timer;

var compliments = [
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

function allDivsHide (callback) {
	var indexHighest = 0;
	var currentDiv;

	$("#container div").each(function() {
		var indexCurrent = parseInt($(this).css("z-index"));
		if (indexCurrent > indexHighest) {
			indexHighest = indexCurrent;
			currentDiv = this;
			console.log(currentDiv);
		}
	});

	$(currentDiv).attr("id", "current");
	console.log(currentDiv);
	console.log("current starts with: ", $("#current").html());

	callback($("#current"));
}

function clipCompliment (c) {

	var w = parseInt($(window).width());
	var h = parseInt($("#current").height());
	var p = parseInt($(c).css("padding-top")); // top padding of the div
	var z = parseInt($(c).css("z-index"));
	var i = 0;

	if (!($(c).hasClass("last"))) {
		timer = setInterval(function () {
			$(c).css("clip", "rect(" + i +"px, "+ w + "px, " + h + p + "px, 0px)");
	        i++;
	        if (i == h + p) {
	        	$(c).css("z-index", z * (-1) );
	        	$(c).css("clip", "rect(0px, "+ w + "px, " + h + p + "px, 0px)");
	        	$(c).removeAttr("id");
	        	clearInterval(timer);
	        	console.log("first really down.");
	        	setTimeout(function () { allDivsHide(clipCompliment); }, 3400);
	        }
		}, 30);
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

function sortCompliments () { // later change this function to $.map()
	comp = [];
	for (var i=0, len=compliments.length; i<len; i++) {
		var n = compliments[i].length;
		if (n <= 140) {
			comp.push(compliments[i]);
		};
	}
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
	$(window).resize(function () {
		
		if ($(window).width() < 510) {
			$("#container div").css("height", "9.2em");
		}
		else if ($(window).width() < 725) {
			$("#container div").css("height", "7.8em");
		}
		else {
			$("#container div").css("height", "6.8em");
		}
	})
}


function initialize() {
	sortCompliments();
	createComplimentDivs();
	resizeCheck();
	timer = setTimeout(function () { allDivsHide(clipCompliment); }, 3400);
}

$(document).ready(initialize);