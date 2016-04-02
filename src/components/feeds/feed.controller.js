import {app} from '../../app.module';
import './feed.service';

app.controller('FeedController', ['$scope', '$stateParams', 'FeedService', function($scope, $stateParams, FeedService) {
  $scope.feed = FeedService.get($stateParams.id);
}]);
