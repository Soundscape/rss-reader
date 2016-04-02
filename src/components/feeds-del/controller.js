import {app} from '../../app.module';

app.controller('FeedsController', ['$scope', function($scope) {
  $scope.items = [1,2,3,4,5,6,7,8,9,10];
}]);
