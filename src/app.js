
import 'angular';
import 'angular-animate';
import 'angular-material';
import 'angular-ui-router';
import 'angular-messages';

console.log(angular);

angular
  .module('app', ['ui.router', 'ngAria', 'ngMessages', 'ngAnimate', 'ngMaterial'])
  .controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
    $scope.toggleLeft = function() { $mdSidenav('left').toggle(); };
    $scope.close = function() { $mdSidenav('left').close(); };
  }]);
