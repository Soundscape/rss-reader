import {app} from '../../app.module';

app.directive('menu', [function() {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'shared/menu/index.html',
    controller: ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
      $scope.toggleSidebar = function() {
        $mdSidenav('sidebar').toggle();
      }
    }]
  }
}]);
