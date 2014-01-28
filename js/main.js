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
		FB.api( "/342691952483262/links/", function (response) {
			if (response && !response.error) {
				console.log(response.data);
			}
		});
	}
}