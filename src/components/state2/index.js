import {controller} from './list.controller.js';

export function state2(app) {
  app
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/state1');

      $stateProvider
        .state('state2', {
          url: '/state2',
          templateUrl: 'components/state2/index.html'
        })
        .state('state2.list', {
          url: '/list',
          templateUrl: 'components/state2/list.html',
          controller: controller
        });
    }]);
}
