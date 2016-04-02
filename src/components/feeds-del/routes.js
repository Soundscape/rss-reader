import {app} from '../../app.module';
import './controller';

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('feeds', {
      url: '/feeds',
      templateUrl: 'components/feeds/index.html',
      controller: 'FeedsController'
    });
}]);
