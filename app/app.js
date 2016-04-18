'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.wtimer',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
		redirectTo: '/wtimer',
		controller: 'WtimerCtrl as ctlr'
	});
}]);
