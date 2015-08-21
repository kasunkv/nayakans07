(function(){
	'use strict';

	angular
		.module('nayakans07')
		.config(configuration)
		.constant('API_URL', 'http://localhost:8080/api')
		.run(function ($window) {
			var params = $window.location.search.substring(1);
			// make sure params and window.opener and the locations of the popup and the origi is equal
			if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
				var paramSegments = params.split('=');
				var code = decodeURIComponent(paramSegments[1]);
				console.log($window.location.origin);
				$window.opener.postMessage(code, $window.location.origin);
			}
		});


	function configuration ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, API_URL) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/home/home.html'
			})
			.state('about', {
				url: '/about',
				templateUrl: '/about/about.html'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: '/contact/contact.html'
			})
			.state('login', {
				url: '/login',
				templateUrl: '/login/login.html',
				controller: 'LoginController'
			})
			.state('register',  {
				url: '/register',
				templateUrl: '/register/register.html',
				controller: 'RegisterController'
			});

		// Configure satellizer
		$authProvider.loginUrl = API_URL + '/login';
		$authProvider.signupUrl = API_URL + '/register';

		// Auth Configuration
		// Google
		$authProvider.google({
			clientId: '608434428542-nam8g92uj4keip51rbchoqnsjd88hdjh.apps.googleusercontent.com',
			url: API_URL + '/auth/google'
		});

		// facebook
		$authProvider.facebook({
			clientId: '138460523160494',
			url: API_URL + '/auth/facebook',
			redirectUri: 'http://localhost:8080/#/register'
		});

		// twitter *
		$authProvider.twitter({
			url: '/auth/twitter'
		});

		// linkedin
		$authProvider.linkedin({
			clientId: '75hefyb0tunpci',
			url: '/auth/linkedin'
		});

		// yahoo *
		$authProvider.yahoo({
			clientId: 'dj0yJmk9dkNGM0RTOHpOM0ZsJmQ9WVdrOVlVTm9hVk0wTkRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0wMA--',
			url: '/auth/yahoo'
		});


		//$httpProvider.interceptors.push('authInterceptor');
	}
})();
