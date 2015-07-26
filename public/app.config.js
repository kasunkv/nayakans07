(function(){
	'use strict';

	angular
		.module('nayakans07')
		.config(configuration);


	function configuration ($stateProvider, $urlRouterProvider) {
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
				templateUrl: '/login/login.html'
			})
			.state('register',  {
				url: '/register',
				templateUrl: '/register/register.html',
				controller: 'RegisterController'
			});
	}
})();
