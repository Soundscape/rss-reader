import {app} from '../../app.module';
import './feeds.controller';
import './feed.controller';

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('feeds', {
      url: '/feeds',
      templateUrl: 'components/feeds/feeds.html',
      controller: 'FeedsController'
    })
    .state('feed', {
      url: '/feeds/:id',
      templateUrl: 'components/feeds/feed.html',
      controller: 'FeedController'
    });
}]);
