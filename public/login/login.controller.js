(function(){
	'use strict';
	angular
		.module('nayakans07')
		.controller('LoginController', loginController);

	function loginController ($scope, alert) {
		$scope.commingSoon = function () {
			alert('info', 'We Are Still At Work! ', 'The application is still under development. Subscribe from the register page and we will get back to you.');
		};
	}

})();
