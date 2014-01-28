window.fbAsyncInit = function() {
	FB.init({
		appId: '516347275130300', // App ID
		channelUrl: 'http://sandraszenti.github.io/daily-odd-compliments/channel.html',
		status: true, // check login status
		cookie: true, // enable cookies to allow the server to access the session
		xfbml: true  // parse XFBML
	});

	syncInit = true;

	console.log("Facebook setup completed. Start fetching now...");

	if (syncInit) {
		FB.api( "/342691952483262/links/?key=value&access_token=516347275130300|9ca6946c431623ca202b9849b037b697", function (response) {
			console.log("starting....");
			if (response && !response.error) {
				onsole.log("there is hope after all");
				console.log(response.data);
			}
			else {
				console.log(response.error);
			}
		});
	}
}