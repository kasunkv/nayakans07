(function () {
	'use strict';

	angular.module('nayakans07')
	  .service('alert', alertService);

  	function alertService ($rootScope, $timeout) {
	    return function (type, title, message, timeout) {
	      var alertTimeout;
	      $rootScope.alert = {
	        hasBeenShown: true,
	        show: true,
	        type: type,
	        message: message,
	        title: title
	      };
	      $timeout.cancel(alertTimeout);
	      alertTimeout = $timeout(function () {
	        $rootScope.alert.hasBeenShown = false;
	      }, timeout || 4000);


	    };
 	}	

})();
