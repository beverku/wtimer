'use strict';


angular.module('myApp.wtimer', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wtimer', {
    templateUrl: 'wtimer/wtimer.html',
    controllerAs: 'vm',
    controller: 'WtimerCtrl'
  });
}])

.controller('WtimerCtrl', ['$scope', '$interval', WTimerCtlr]);


function WTimerCtlr($scope, $interval) {
    var vm = this;

    vm.availableHours = [0,99];
    vm.availableMinutes = [0,59];
    vm.availableSeconds = [0,59];

    vm.preStartComplete = false;
    vm.preStartTime = 0;
    vm.totalElapsed = 0;
    vm.startTime = 0;
    vm.intervalPromise;

    vm.displayTime = '00:00.00';
    /*
    vm.displayTime = {
        hours: '00',
        minutes: '00',
        seconds: '00',
        hundreths: '00',
    };
    */
    updateDisplayTime(vm);

    //TODO: what if running - grey out?
    //TODO: function below?
    //TODO: overflow?
    //TODO: restart
    vm.startTimer = function() {
        //console.log("startTimer");

        //already started?
        if ( angular.isDefined(vm.intervalPromise) ) return;

        vm.preStartComplete = false;
        vm.preStartTime = new Date().getTime();
        //vm.startTime = new Date().getTime();

        //TODO: option necessary?
         vm.intervalPromise = $interval(function () { intervalFired(vm) }, 10);
    }

    vm.stopTimer = function() {
        //TODO: this can be refactored with update above
        //console.log("stopTimer");

        //not running?
        if ( !angular.isDefined(vm.intervalPromise) ) return;

        //Slight race condition here - where the interval may update 
        //But it will be replaced with the actual stop time from this now
        var now = new Date().getTime();

        //cancel interval
        $interval.cancel(vm.intervalPromise);
        vm.intervalPromise = undefined;


        //update
        updateElapsedTime(vm, now);
    }

    $scope.$on('$destroy', function() {
        //console.log("destroy called");
        // Make sure that the interval is destroyed too
        $scope.stopTimer();
    });
};

function intervalFired(vm) {
    var now = new Date().getTime();
    updateElapsedTime(vm, now);
};

//TODO: if we want stop/restart we need to add something
function updateElapsedTime(vm, now) {
    //10 Second Count Down Timer before starting real time
    if(!vm.preStartComplete) {
        var preTimeElapsed = 10000 - (now - vm.preStartTime);
        vm.totalElapsed = preTimeElapsed;
        updateDisplayTime(vm);

        if(preTimeElapsed <= 0) {
            //Start real time
            vm.startTime = new Date().getTime();
            vm.preStartComplete = true;
        }
    }
    else {
        var elapsed = now - vm.startTime;
        vm.totalElapsed = elapsed;
        updateDisplayTime(vm);
    }
};


function updateDisplayTime(vm) {
    const hours = Math.floor( vm.totalElapsed / 3600000 );
    const minutes = Math.floor( vm.totalElapsed / 60000 ) % 60;
    const seconds = Math.floor( vm.totalElapsed / 1000 ) % 60;
    const hundreths = Math.floor( vm.totalElapsed / 10 ) % 100;

    //Careful this breaks if number is bigger than the pad - but that can't happen here
    const sHours = ("0000" + hours).slice(-2);
    const sMinutes = ("0000" + minutes).slice(-2);
    const sSeconds = ("0000" + seconds).slice(-2);
    const sHundreths = ("0000" + hundreths).slice(-2);

    vm.displayTime = '';
    if(hours >= 1) {
        vm.displayTime = `${sHours}:`;
    }
    vm.displayTime += `${sMinutes}:${sSeconds}.${sHundreths}`;

    /* TODO - this may be a better way if we want to allow the user to tune the diplay
    vm.displayTime.hours = hours;
    vm.displayTime.minutes = (minutes < 10 ? `0${minutes}` : minutes) ;
    vm.displayTime.seconds = (seconds < 10 ? `0${seconds}` : seconds) ;
    vm.displayTime.hundreths = (hundreths < 10 ? `0${hundreths}` : hundreths) ;
    */

};


