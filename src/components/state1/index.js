import {controller} from './list.controller';

export function state1(app) {
  app
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/state1');

      $stateProvider
        .state('state1', {
          url: '/state1',
          templateUrl: 'components/state1/index.html'
        })
        .state('state1.list', {
          url: '/list',
          templateUrl: 'components/state1/list.html',
          controller: controller
        });
    }]);
};
