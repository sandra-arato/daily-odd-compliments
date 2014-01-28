window.fbAsyncInit = function() {
	FB.init({
		appId: '516347275130300', // App ID
		channelUrl: 'http://sandraszenti.github.io/daily-odd-compliments/channel.html',
		status: true, // check login status
		cookie: true, // enable cookies to allow the server to access the session
		xfbml: true  // parse XFBML
	});

	
  
	$.ajax( {
		dataType: "json",
		url: "https://www.facebook.com/feeds/page.php?id=342691952483262&format=json",
		success: function() {
					console.log("ajax call success");
					console.log(data);
		}
	})
	.done( function() { console.log("should be done");});

	console.log("Facebook setup completed. Start fetching now...");

	
}