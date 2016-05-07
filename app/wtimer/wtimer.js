'use strict';


angular.module('myApp.wtimer', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wtimer', {
    templateUrl: 'wtimer/wtimer.html',
    controllerAs: 'vm',
    controller: 'WtimerCtrl'
  });
}])

//.controller('WtimerCtrl', ['$scope', '$interval', WTimerCtlr]);
.controller('WtimerCtrl', ['$scope', '$interval', 

function WTimerCtlr($scope, $interval) {
    console.log("WTimerCtlr() function being called");
    console.trace();
    var vm = this;

    vm.availableHours = [0,99];
    vm.availableMinutes = [0,59];
    vm.availableSeconds = [0,59];

    vm.totalTime = 0;
    vm.startTime = 0;
    this.intervalPromise;
    this.testval = "init";
    //TODO: what if running - grey out?
    //TODO: function below?
    //TODO: overflow?
    this.startTimer = function() {
    //vm.startTimer = function() {
        console.log("startTimer");
        console.log(this.intervalPromise);

        console.log(this.testval);
        this.testval = "start";
        console.log(this.testval);

        if ( angular.isDefined(this.intervalPromise) ) return;

        vm.startTime = new Date().getTime();
        console.log("vm.startTime=" + vm.startTime);

        //TODO: option necessary?
         this.intervalPromise = $interval(function () { update(vm) }, 10000);
         console.log(this.intervalPromise);
    }

    //TODO: what if it's not running?
    vm.stopTimer = function() {
        //TODO: this can be refactored with update above
        console.log("stopTimer");
        console.log(this.testval);
        this.testval = "stop";
        console.log(this.testval);
        var now = new Date().getTime();

        console.log(this.intervalPromise);
        if (angular.isDefined(this.intervalPromise)) {
            $interval.cancel(this.intervalPromise);
            this.intervalPromise = undefined;
        }
        else {
            console.log("it's not defined");
        }

        var elapsed = now - vm.startTime;
        console.log("elapsed=" + elapsed);
        vm.totalTime += elapsed;
        console.log("vm.totalTime=" + vm.totalTime);
    }

    $scope.$on('$destroy', function() {
        console.log("destroy called");
        // Make sure that the interval is destroyed too
        $scope.stopTimer();
    });
//};
}]);

function update(vm) {
    //console.log("update");
    var now = new Date().getTime();
    var elapsed = now - vm.startTime;
    console.log("update elapsed=" + elapsed);
    vm.totalTime += elapsed;
    //console.log("vm.totalTime=" + vm.totalTime);
}

function startTimer() {
    console
    .log("startTimer");
}


