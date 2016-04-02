import {app} from '../../app.module';
import './feed.service';

app.controller('FeedsController', ['$scope', 'FeedService', function($scope, FeedService) {
  $scope.feeds = FeedService.list();
}]);
