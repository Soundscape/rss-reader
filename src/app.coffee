angular = require 'angular'
require 'angular-animate'
require 'angular-material'
require 'angular-ui-router'
require 'angular-messages'

console.log 'App loaded'

angular
  .module 'app', ['ui.router', 'ngAria', 'ngMessages', 'ngAnimate', 'ngMaterial']
  .controller 'AppCtrl', ['$scope', '$mdSidenav', ($scope, $mdSidenav) ->
    console.log $mdSidenav
    $scope.toggleLeft = () -> $mdSidenav('left').toggle()
    $scope.close = () -> $mdSidenav('left').close()
  ]
