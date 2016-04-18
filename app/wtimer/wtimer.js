'use strict';

angular.module('myApp.wtimer', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wtimer', {
    templateUrl: 'wtimer/wtimer.html',
    controller: 'WtimerCtrl'
  });
}])

.controller('WtimerCtrl', WTimerCtlr);
//.controller('WtimerCtrl', [function() {
//$scope.hours = [0,99];
//}]);

function WTimerCtlr() {
	this.hours = [0,99];
};
