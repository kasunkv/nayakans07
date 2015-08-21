(function(){
	'use strict';
	angular
		.module('nayakans07')
		.controller('RegisterController', registerController);

	function registerController ($scope, $auth, $state, $http, API_URL, alert) {
		$scope.authenticate = function (provider) {
			$auth.authenticate(provider)
				.then(function (res) {
					$scope.profileImage = res.profileImage;
					console.log(res);
				}, authErrorHandler);
		};

		$scope.subscribe = function () {
			$http.post(API_URL + '/subscribe', {
				email: $scope.email
			})
			.success(function (res) {
				console.log(res);
				alert('success', 'Congradulations! ', res.message);
				$scope.email = '';
			})
			.error(function (err) {
				console.log(err);
				alert('danger', 'Oopz! ', res.message);
			});
		};

		function authErrorHandler (err) {
			console.log(err);
		}
	}

})();
