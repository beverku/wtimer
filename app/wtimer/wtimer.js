'use strict';

angular.module('myApp.wtimer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wtimer', {
    templateUrl: 'wtimer/wtimer.html',
    controller: 'WtimerCtrl'
  });
}])

.controller('WtimerCtrl', [function() {

}]);
