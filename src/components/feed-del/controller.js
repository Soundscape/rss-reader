import {app} from '../../app.module';

app.controller('FeedController', ['$scope', '$stateParams', function($scope, $stateParams) {
  console.log($stateParams);
  $scope.title = 'Lorem ipsum';
  $scope.description = 'Lorem ipsum dolor sit amet.';

  $scope.items = [1,2,3];
}]);
