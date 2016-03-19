import 'angular';
import 'angular-animate';
import 'angular-material';
import 'angular-ui-router';
import 'angular-messages';
import {state1} from './components/state1';
import {state2} from './components/state2';

var app = angular
  .module('app', ['ui.router', 'ngAria', 'ngMessages', 'ngAnimate', 'ngMaterial']);

state1(app);
state2(app);
