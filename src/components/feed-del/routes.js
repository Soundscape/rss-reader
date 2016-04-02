import {app} from '../../app.module';
import './controller';

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  window.q = $stateProvider;
  window.w = $urlRouterProvider;
  $stateProvider
    .state('feed', {
      url: '/feeds/:id',
      templateUrl: 'components/feed/index.html',
      controller: 'FeedController'
    });
}]);
