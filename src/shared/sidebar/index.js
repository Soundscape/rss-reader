import {app} from '../../app.module';

app.directive('sidebar', [function() {
  return {
    replace: true,
    restrict: 'E',
    templateUrl: 'shared/sidebar/index.html'
  }
}]);
